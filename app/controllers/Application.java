package controllers;

import models.domain.security.AccessAuthenticator;
import org.pac4j.play.java.JavaController;
import org.pac4j.play.java.RequiresAuthentication;
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
public class Application extends JavaController {
//    @Security.Authenticated(AccessAuthenticator.class)
    @RequiresAuthentication(clientName = "CasClient")
    public Result index() {
        return ok(index.render());
    }

    public Result login() {
        return ok(login.render());
    }
}
