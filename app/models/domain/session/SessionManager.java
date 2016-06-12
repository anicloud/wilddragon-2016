package models.domain.session;

import akka.actor.ActorRef;
import akka.actor.PoisonPill;
import akka.actor.Props;
import akka.actor.UntypedActor;
import com.fasterxml.jackson.databind.JsonNode;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;
import play.libs.F;
import play.mvc.WebSocket;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

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
                actor.actorRef.tell(message, actor.self());
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

    }

    public synchronized Set<WebSocketSession> getSessions(String key) {
        return sessionMap.get(key);
    }

    public WebSocket<JsonNode> getSocket(final String key) {
        if (key == null) {
            return null;
        }
        WebSocket<JsonNode> webSocket = WebSocket.withActor(new F.Function<ActorRef, Props>() {
            @Override
            public Props apply(ActorRef actorRef) throws Throwable {
                return Props.create(WebSocketActor.class, actorRef, key);
            }
        });
        return webSocket;
    }

}
