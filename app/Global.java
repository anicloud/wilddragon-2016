import play.*;

import org.springframework.context.*;
import org.springframework.context.support.*;

public class Global extends GlobalSettings {

	private ApplicationContext ctx;

	@Override
	public void onStart(Application app) {
		this.ctx = new ClassPathXmlApplicationContext("spring-context/Context.xml");
	}

	@Override
	public <A> A getControllerInstance(Class<A> clazz) {
		return this.ctx.getBean(clazz);
	}

}