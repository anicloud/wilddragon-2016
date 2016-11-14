package controllers;

import org.pac4j.play.java.JavaController;
import org.pac4j.play.java.RequiresAuthentication;
import org.springframework.stereotype.Component;
import play.Play;
import play.libs.Json;
import play.mvc.Result;


/**
 * Created by huangbin on 12/14/15.
 */
@Component
public class Application extends JavaController {
//    @Security.Authenticated(AccessAuthenticator.class)
    final String baseUrl = Play.application().configuration().getString("baseUrl");
    final String casUrl = Play.application().configuration().getString("casUrl");

    @RequiresAuthentication(clientName = "CasClient")
    public Result index() {
        return ok(Application.class.getResourceAsStream("/public/index.html")).as("text/html");
    }

    //get lt、execution parameters
    public Result getParametersFromCAS(){
        String getParametersUrl = casUrl + "/login?mode=app&service=" + baseUrl +"/";
        return ok(Json.toJson(getParametersUrl));
    }
    public Result postLoginUrl(){
        return ok(Json.toJson(casUrl));
    }



    public Result register() { return ok();
//        return ok(register.render());
    }
}
