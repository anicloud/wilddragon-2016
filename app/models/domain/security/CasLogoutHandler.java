package models.domain.security;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.pac4j.cas.logout.LogoutHandler;
import org.pac4j.core.context.WebContext;
import org.pac4j.play.Config;
import org.pac4j.play.StorageHelper;
import org.pac4j.play.java.JavaWebContext;

/**
 * Created by huangbin on 1/28/16.
 */
public class CasLogoutHandler implements LogoutHandler {
    private static final Logger LOG = Logger.getLogger(CasLogoutHandler.class);

    public boolean isTokenRequest(WebContext context) {
        boolean result = context.getRequestParameter("ticket") != null;
        LOG.info("isTokenRequest: " + result);
        return result;
    }

    @Override
    public boolean isLogoutRequest(WebContext context) {
        boolean result = "POST".equals(context.getRequestMethod()) && context.getRequestParameter("logoutRequest") != null;
        LOG.info("isLogoutRequest: " + result);
        return result;
    }

    @Override
    public void recordSession(WebContext context, String ticket) {
        LOG.info("ticket : {}" + ticket);
        JavaWebContext javaWebContext = (JavaWebContext)context;
        String sessionId = (String)javaWebContext.getSession().get("pac4jSessionId");
        LOG.info("save sessionId : {}" + sessionId);
        StorageHelper.save(ticket, sessionId, Config.getProfileTimeout());
    }

    @Override
    public void destroySession(WebContext context) {
        String logoutRequest = context.getRequestParameter("logoutRequest");
        LOG.info("logoutRequest : {}" + logoutRequest);
        String ticket = StringUtils.substringBetween(logoutRequest, "SessionIndex>", "</");
        LOG.info("extract ticket : {}" + ticket);
        String sessionId = (String)StorageHelper.get(ticket);
        LOG.info("found sessionId : {}" + sessionId);
        StorageHelper.removeProfile(sessionId);
        StorageHelper.remove(ticket);
    }
}
