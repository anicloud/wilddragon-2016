import models.domain.security.CasLogoutHandler;
import org.pac4j.cas.client.CasClient;
import org.pac4j.core.client.Clients;
import org.pac4j.play.Config;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import play.Application;
import play.GlobalSettings;
import play.Play;

public class Global extends GlobalSettings {

    private ApplicationContext ctx;

    @Override
    public void onStart(Application app) {
        // spring
        this.ctx = new ClassPathXmlApplicationContext("spring-context/ApplicationContext.xml");

        // CAS
        final String baseUrl = Play.application().configuration().getString("baseUrl");
        final String casUrl = Play.application().configuration().getString("casUrl");
        final CasClient casClient = new CasClient();

        casClient.setCasPrefixUrl(casUrl);
        casClient.setCasLoginUrl(baseUrl + "/login");
        casClient.setLogoutHandler(new CasLogoutHandler());

        final Clients clients = new Clients(baseUrl + "/callback", casClient); // , casProxyReceptor);
        Config.setClients(clients);
        Config.setDefaultLogoutUrl(casUrl + "/logout?service=" + baseUrl);
        Config.setProfileTimeout(259200); // 3 days

        // for test purposes : profile timeout = 60 seconds
    }

    @Override
    public <A> A getControllerInstance(Class<A> clazz) {
		return this.ctx.getBean(clazz);
	}

}