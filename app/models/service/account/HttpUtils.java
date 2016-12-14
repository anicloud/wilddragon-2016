package models.service.account;

import org.pac4j.core.context.HttpConstants;
import org.pac4j.core.exception.TechnicalException;
import org.pac4j.core.util.CommonHelper;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

/**
 * Created by hey on 16-11-3.
 */
public class HttpUtils {
    private static String UTF8_ENCODING = "UTF-8";

    private HttpUtils() {
    }

    public static String buildHttpErrorMessage(final HttpURLConnection connection) throws IOException {
        final StringBuilder messageBuilder = new StringBuilder("(").append(connection.getResponseCode()).append(")");
        if (connection.getResponseMessage() != null) {
            messageBuilder.append(" ");
            messageBuilder.append(connection.getResponseMessage());
        }
        return messageBuilder.toString();
    }

    public static HttpURLConnection openPostConnection(final URL url) throws IOException {
        return openConnection(url, "POST");
    }

    public static HttpURLConnection openDeleteConnection(final URL url) throws IOException {
        return openConnection(url, "DELETE");
    }

    public static HttpURLConnection openConnection(final URL url, final String requestMethod) throws IOException {
        final HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setDoInput(true);
        connection.setDoOutput(true);
        connection.setRequestMethod(requestMethod);
        return connection;
    }

    public static String encodeQueryParam(final String paramName, final String paramValue) throws UnsupportedEncodingException {
        return urlEncode(paramName) + "=" + urlEncode(paramValue);
    }

    public static void closeConnection(final HttpURLConnection connection) {
        if (connection != null) {
            connection.disconnect();
        }
    }

    public static String urlEncode(final String text) {
        try {
            return URLEncoder.encode(text, UTF8_ENCODING);
        } catch (final UnsupportedEncodingException e) {
            final String message = "Unable to encode text : " + text;
            throw new TechnicalException(message, e);
        }
    }
}
