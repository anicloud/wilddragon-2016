package models.service.account;

import org.jasig.cas.client.validation.TicketValidator;
import org.pac4j.cas.profile.CasProfile;

/**
 * Created by hey on 16-11-3.
 */
public interface CasRestLogin {

    public String requestTicketGrantingTicket(String casRestUrl,String username,String password);

    public TokenCredentials requestServiceTicket(String casRestURl,String TGT,String serviceURL);

    public CasProfile validateServiceTicket(String serviceURL, String ticket, TicketValidator ticketValidator);

    public void destroyTicketGrantingTicket(String deleteUrl) ;


}
