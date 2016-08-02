package controllers;

import org.pac4j.play.java.JavaController;
import org.pac4j.play.java.RequiresAuthentication;
import org.springframework.stereotype.Component;
import play.Play;
import play.mvc.Result;


/**
 * Created by huangbin on 12/14/15.
 */
@Component
public class Application extends JavaController {
//    @Security.Authenticated(AccessAuthenticator.class)
    @RequiresAuthentication(clientName = "CasClient")
    public Result index() {
//        return ok(index.render());
//        File indexFile = Play.application().getFile("/public/index.html");
        return ok(Application.class.getResourceAsStream("/public/index.html")).as("text/html");
    }

    public Result login(String service) { return ok();
//        final String appLoginUrl = Play.application().configuration().getString("baseUrl") + "/login";
//        final String casLoginUrl = Play.application().configuration().getString("casUrl") + "/login";
//        return ok(login.render(casLoginUrl, appLoginUrl, service));
    }

    public Result register() { return ok();
//        return ok(register.render());
    }
}
