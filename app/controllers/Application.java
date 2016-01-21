package controllers;

import models.domain.security.AccessAuthenticator;
import org.springframework.stereotype.Component;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import views.html.index;
import views.html.login;

/**
 * Created by huangbin on 12/14/15.
 */
@Component
public class Application extends Controller {
//    @Security.Authenticated(AccessAuthenticator.class)
    public Result index() {
        return ok(index.render());
    }

    public Result login() {
        return ok(login.render());
    }
}
