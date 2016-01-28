import models.domain.security.CasLogoutHandler;
import org.pac4j.cas.client.CasClient;
import org.pac4j.cas.logout.CasSingleSignOutHandler;
import org.pac4j.core.client.Clients;
import org.pac4j.play.Config;
import org.pac4j.play.PlayLogoutHandler;
import play.*;

import org.springframework.context.*;
import org.springframework.context.support.*;

public class Global extends GlobalSettings {

    private ApplicationContext ctx;

    @Override
    public void onStart(Application app) {
        // spring
        this.ctx = new ClassPathXmlApplicationContext("spring-context/Context.xml");

        // CAS
        final String baseUrl = Play.application().configuration().getString("baseUrl");
        final String casUrl = Play.application().configuration().getString("casUrl");
        final CasClient casClient = new CasClient();
        // casClient.setCasProtocol(CasProtocol.SAML);
        // casClient.setGateway(true);
        /*final CasProxyReceptor casProxyReceptor = new CasProxyReceptor();
        casProxyReceptor.setCallbackUrl("http://localhost:9000/casProxyCallback");
        casClient.setCasProxyReceptor(casProxyReceptor);*/
        casClient.setCasLoginUrl(casUrl + "/login");
        casClient.setLogoutHandler(new CasLogoutHandler());
//        casClient.setLogoutHandler(new CasSingleSignOutHandler());

        final Clients clients = new Clients(baseUrl + "/callback", casClient); // , casProxyReceptor);
        Config.setClients(clients);
        Config.setDefaultLogoutUrl(casUrl + "/logout");

        // for test purposes : profile timeout = 60 seconds
        // Config.setProfileTimeout(60);
    }

//	@Override
//	public <A> A getControllerInstance(Class<A> clazz) {
//		return this.ctx.getBean(clazz);
//	}

}