package models.domain.security;

import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;

/**
 * Created by huangbin on 12/11/15.
 */
public class AccessAuthenticator extends Security.Authenticator {
    @Override
    public String getUsername(Http.Context context) {
        Http.Cookie cookie = context.request().cookie("token");
        if (cookie != null && cookie.httpOnly()) {
            return cookie.value();
        } else {
            return null;
        }
    }

    @Override
    public Result onUnauthorized(Http.Context context) {
//        return redirect(controllers.routes.Application.login(""));
        return ok();
    }
}
