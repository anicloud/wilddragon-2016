package models.service.account;

import org.jasig.cas.client.authentication.AttributePrincipal;
import org.jasig.cas.client.validation.Assertion;
import org.jasig.cas.client.validation.TicketValidationException;
import org.jasig.cas.client.validation.TicketValidator;
import org.pac4j.cas.profile.CasProfile;
import org.pac4j.core.context.HttpConstants;
import org.pac4j.core.client.*;
import org.pac4j.core.context.Pac4jConstants;
import org.pac4j.core.credentials.Authenticator;
import org.pac4j.core.exception.TechnicalException;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by hey on 16-11-3.
 */
@Service
public class CasRestLoginImpl implements CasRestLogin{

    private static String USERNAME = "username";
    private static String PASSWORD = "password";
    private static String UTF8_ENCODING = "UTF-8";

    int OK = 200;

    int CREATED = 201;

    int OK_NO_CONTENT = 204;

    int UNAUTHORIZED = 401;

    int FORBIDDEN = 403;

    int TEMP_REDIRECT = 302;

    int BAD_REQUEST = 400;

    int DEFAULT_HTTP_PORT = 80;

    int DEFAULT_HTTPS_PORT = 443;

    String SCHEME_HTTP = "http";

    String SCHEME_HTTPS = "https";

    int DEFAULT_CONNECT_TIMEOUT = 500;

    int DEFAULT_READ_TIMEOUT = 5000;

    String LOCATION_HEADER = "Location";

    String AUTHORIZATION_HEADER = "Authorization";

    String BASIC_HEADER_PREFIX = "Basic ";

    String DIGEST_HEADER_PREFIX = "Digest ";

    String AUTHENTICATE_HEADER = "WWW-Authenticate";

    String CONTENT_TYPE_HEADER = "Content-Type";

    String HTML_CONTENT_TYPE = "text/html; charset=utf-8";

    String AJAX_HEADER_VALUE = "XMLHttpRequest";

    String AJAX_HEADER_NAME = "X-Requested-With";

    enum HTTP_METHOD { GET, POST, HEAD, TRACE, PUT, DELETE, OPTIONS }

    String ACCESS_CONTROL_ALLOW_ORIGIN_HEADER = "Access-Control-Allow-Origin";

    String ACCESS_CONTROL_EXPOSE_HEADERS_HEADER = "Access-Control-Expose-Header";

    String ACCESS_CONTROL_MAX_AGE_HEADER = "Access-Control-Max-Age";

    String ACCESS_CONTROL_ALLOW_CREDENTIALS_HEADER = "Access-Control-Allow-Credentials";

    String ACCESS_CONTROL_ALLOW_METHODS_HEADER = "Access-Control-Allow-Methods";

    String ACCESS_CONTROL_ALLOW_HEADERS_HEADER = "Access-Control-Allow-Headers";

    @Override
    public String requestTicketGrantingTicket(String casRestUrl,String username,String password) {
        HttpURLConnection connection = null;
        try {
            connection = HttpUtils.openPostConnection(new URL(casRestUrl));
                final String payload = HttpUtils.encodeQueryParam(USERNAME, username)
                    + "&" + HttpUtils.encodeQueryParam(PASSWORD, password);

            final BufferedWriter out = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream(), UTF8_ENCODING));
            out.write(payload);
            out.close();

            final String locationHeader = connection.getHeaderField("location");
            final int responseCode = connection.getResponseCode();
            if (locationHeader != null && responseCode == CREATED) {
                return locationHeader.substring(locationHeader.lastIndexOf("/") + 1);
            }

            throw new TechnicalException("Ticket granting ticket request failed: " + locationHeader + " " + responseCode +
                    HttpUtils.buildHttpErrorMessage(connection));
        } catch (final IOException e) {
            throw new TechnicalException(e);
        } finally {
            HttpUtils.closeConnection(connection);
        }
    }

    @Override
    public TokenCredentials requestServiceTicket(String casRestURl,String TGT,String serviceURL) {
        HttpURLConnection connection = null;
        try {
            String ticketURL = casRestURl + TGT;
            final URL requestURL = new URL(ticketURL);

            connection = HttpUtils.openPostConnection(requestURL);
            final String payload = HttpUtils.encodeQueryParam("service", serviceURL);

            final BufferedWriter out = new BufferedWriter(new OutputStreamWriter(connection.getOutputStream(), UTF8_ENCODING));
            out.write(payload);
            out.close();

            final int responseCode = connection.getResponseCode();
            if (responseCode == HttpConstants.OK) {
                try (final BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream(), UTF8_ENCODING))) {
                    return new TokenCredentials(in.readLine(), getClass().getSimpleName());
                }
            }
            throw new TechnicalException("Service ticket request for `" + ticketURL + "` failed: " +
                    HttpUtils.buildHttpErrorMessage(connection));
        } catch (final IOException e) {
            throw new TechnicalException(e);
        } finally {
            HttpUtils.closeConnection(connection);
        }
    }

    @Override
    public CasProfile validateServiceTicket(String serviceURL, String ticket, TicketValidator ticketValidator) {
        try {

            final Assertion assertion = ticketValidator.validate(ticket, serviceURL);
            final AttributePrincipal principal = assertion.getPrincipal();
            CasProfile casProfile = new CasProfile();
            casProfile.setId(principal.getName());
            casProfile.addAttributes(principal.getAttributes());
            return casProfile;
        } catch (final TicketValidationException e) {
            throw new TechnicalException(e);
        }
    }

    @Override
    public void destroyTicketGrantingTicket(String deleteUrl) {
        HttpURLConnection connection = null;
        try {
            final URL deleteURL = new URL(deleteUrl);
            connection = HttpUtils.openDeleteConnection(deleteURL);
            final int responseCode = connection.getResponseCode();
            if (responseCode != HttpConstants.OK) {
                throw new TechnicalException("TGT delete request for `"  + "` failed: " +
                        HttpUtils.buildHttpErrorMessage(connection));
            }
        } catch (final IOException e) {
            throw new TechnicalException(e);
        } finally {
            HttpUtils.closeConnection(connection);
        }
    }
}
