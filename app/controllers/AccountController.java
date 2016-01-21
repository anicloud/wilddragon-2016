package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.domain.security.AccessAuthenticator;
import models.dto.RetDataDto;
import models.dto.account.*;
import models.service.account.AccountServiceAdapter;
import org.springframework.stereotype.Component;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;

import javax.annotation.Resource;
import java.util.Set;

/**
 * Created by huangbin on 12/14/15.
 */
@Component
@Security.Authenticated(AccessAuthenticator.class)
public class AccountController extends Controller {
    @Resource
    private AccountServiceAdapter accountServiceAdapter;

    public Result getAccount() {
        RetDataDto retDataDto = null;
        try {
            Long id = Long.valueOf(request().cookie("accountId").value());
            AccountData accountData = accountServiceAdapter.getAccountById(id);
            retDataDto = new RetDataDto(true, "", accountData);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result getContacts() {
        RetDataDto retDataDto = null;
        try {
            Long id = Long.valueOf(request().cookie("accountId").value());
            Set<AccountData> contactsData = accountServiceAdapter.getContactsById(id);
            retDataDto = new RetDataDto(true, "", contactsData);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result login() {
        RetDataDto retDataDto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountLoginData loginData = objectMapper.treeToValue(request().body().asJson(), AccountLoginData.class);
            AccountData accountData = accountServiceAdapter.loginAccount(loginData);
            retDataDto = new RetDataDto(true, "", accountData);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result logout() {
        RetDataDto retDataDto = null;
        try {
            Long id = Long.valueOf(request().cookie("accountId").value());
            accountServiceAdapter.logoutAccountById(id);
            retDataDto = new RetDataDto(true, "");
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result createGroup() {
        RetDataDto retDataDto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupRegisterData registerData = objectMapper.treeToValue(request().body().asJson(), AccountGroupRegisterData.class);
            AccountGroupData groupData = accountServiceAdapter.createAccountGroup(registerData);
            retDataDto = new RetDataDto(true, "", groupData);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result deleteGroup() {
        RetDataDto retDataDto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupData groupData = objectMapper.treeToValue(request().body().asJson(), AccountGroupData.class);
            groupData = accountServiceAdapter.deleteAccountGroup(groupData.owner, groupData.groupId);
            retDataDto = new RetDataDto(true, "", groupData);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result inviteAccount() {
        RetDataDto retDataDto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupInviteData inviteData = objectMapper.treeToValue(request().body().asJson(), AccountGroupInviteData.class);
            AccountGroupData groupData = accountServiceAdapter.inviteAccountGroup(inviteData.accountId, inviteData.groupId);
            retDataDto = new RetDataDto(true, "", groupData);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result joinAccountGroup() {
        RetDataDto retDataDto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupInviteData inviteData = objectMapper.treeToValue(request().body().asJson(), AccountGroupInviteData.class);
            AccountGroupData groupData = accountServiceAdapter.joinAccountGroup(inviteData.accountId, inviteData.groupId);
            retDataDto = new RetDataDto(true, "", groupData);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result quitAccountGroup() {
        RetDataDto retDataDto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupInviteData inviteData = objectMapper.treeToValue(request().body().asJson(), AccountGroupInviteData.class);
            AccountGroupData groupData = accountServiceAdapter.quitAccountGroup(inviteData.accountId, inviteData.groupId);
            retDataDto = new RetDataDto(true, "", groupData);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }


}
