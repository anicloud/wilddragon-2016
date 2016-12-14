package models.service.account;

/**
 * Created by hey on 16-11-3.
 */
public class TokenCredentials {
    private String token;
    private String clientName;

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getClientName() {
        return clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }

    public TokenCredentials(String token, final String clientName) {
        this.token = token;
        setClientName(clientName);
    }

}
