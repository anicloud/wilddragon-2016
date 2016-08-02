package models.domain.session;

import akka.actor.ActorRef;
import akka.actor.PoisonPill;
import akka.actor.Props;
import akka.actor.UntypedActor;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import play.libs.F;
import play.mvc.WebSocket;

import java.util.*;

/**
 * Created by huangbin on 12/11/15.
 */
@Component
public class SessionManager {
    private static final Logger LOG = Logger.getLogger(SessionManager.class);
    private static Map<String, Set<WebSocketSession>> sessionMap = new HashMap<>();

    public static class WebSocketSession {
        private WebSocketActor actor;

        public WebSocketSession(WebSocketActor actor) {
            this.actor = actor;
        }

        public void send(Object  message) {
            try {
                actor.tell(message);
            } catch (Exception e) {
                LOG.warn(e);
            }
        }

        public void close() {
            try {
                actor.self().tell(PoisonPill.getInstance(), actor.self());
            } catch (Exception e) {
                LOG.warn(e);
            }
        }

        public void onReceive(Object message) {
            // TODO
            LOG.info("receive" + message);
        }

        public void onClose() {
            // TODO
            LOG.info("close");
        }
    }

    public static class WebSocketActor extends UntypedActor {
        private final ActorRef actorRef;
        private final String key;
        private WebSocketSession session;

        public WebSocketActor(ActorRef actorRef, String key) {
            this.actorRef = actorRef;
            this.key = key;
            this.session = null;
        }

        @Override
        public void preStart() throws Exception {
            synchronized (sessionMap) {
                Set<WebSocketSession> sessions = sessionMap.get(key);
                session = new WebSocketSession(this);
                if (sessions == null) {
                    sessions = new HashSet<>();
                    sessions.add(this.session);
                    sessionMap.put(key, sessions);
                } else {
                    sessions.add(this.session);
                }
            }
        }

        @Override
        public void onReceive(Object message) throws Exception {
            session.onReceive(message);
        }

        @Override
        public void postStop() throws Exception {
            session.onClose();
            synchronized (sessionMap) {
                Set<WebSocketSession> sessions = sessionMap.get(key);
                if (sessions != null) {
                    sessions.remove(this.session);
                }
            }
        }

        public void tell(Object message){
            this.actorRef.tell(message, self());
        }

    }

    public synchronized Set<WebSocketSession> getSessions(String key) {
        return sessionMap.get(key);
    }

    public static void sessionSend(String key, Object message){
        if(!sessionMap.containsKey(key)){
            return;
        }
        Iterator<WebSocketSession> iterator = sessionMap.get(key).iterator();
        while(iterator.hasNext()){
            iterator.next().send(message.toString());
        }
    }

    public WebSocket<String> getSocket(final String key) {
        if (key == null) {
            return null;
        }
        WebSocket<String> webSocket = WebSocket.withActor(new F.Function<ActorRef, Props>() {
            @Override
            public Props apply(ActorRef actorRef) throws Throwable {
                return Props.create(WebSocketActor.class, actorRef, key);
            }
        });
        return webSocket;
    }

}
