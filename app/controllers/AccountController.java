package controllers;

import com.ani.octopus.account.application.service.account.AccountService;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.dto.RetData;
import models.dto.account.*;
import models.service.account.AccountServiceAdapter;
import org.pac4j.core.profile.CommonProfile;
import org.pac4j.play.java.JavaController;
import org.pac4j.play.java.RequiresAuthentication;
import org.springframework.stereotype.Component;
import play.libs.Json;
import play.mvc.Result;

import javax.annotation.Resource;
import java.util.Set;

/**
 * Created by huangbin on 12/14/15.
 */
@Component
//@Security.Authenticated(AccessAuthenticator.class)
@RequiresAuthentication(clientName = "CasClient")
public class AccountController extends JavaController {

    @Resource
    private AccountServiceAdapter accountServiceAdapter;

    private Long getAccountId() {
        final CommonProfile profile = getUserProfile();
        return Long.parseLong((String) profile.getAttribute("accountId"));
    }

    public Result getAccount() {
        RetData retData = null;
        try {
            AccountData accountData = accountServiceAdapter.findAccountById(getAccountId());
            retData = new RetData(true, "", accountData);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result getAccountByEmail(String email) {
        RetData retData = null;
        try {
            AccountData accountData = accountServiceAdapter.findAccountByEmail(email);
            retData = new RetData(true, "", accountData);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result getAccountLike(String query) {
        RetData retData = null;
        try {
            Set<AccountData> accountData = accountServiceAdapter.findAccountLike(query);
            retData = new RetData(true, "", accountData);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result getContacts() {
        RetData retData = null;
        try {
            Set<AccountData> contactsData = accountServiceAdapter.findContacts(getAccountId());
            retData = new RetData(true, "", contactsData);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result getGroups() {
        RetData retData = null;
        try {
            Set<AccountGroupData> groupDatas = accountServiceAdapter.findGroups(getAccountId());
            retData = new RetData(true, "", groupDatas);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }

    }

    public Result createGroup() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupData groupData = objectMapper.treeToValue(request().body().asJson(), AccountGroupData.class);
            groupData.owner = accountServiceAdapter.findAccountById(getAccountId());
            groupData.type = AccountGroupType.CUSTOM;
            groupData = accountServiceAdapter.createAccountGroup(groupData);
            retData = new RetData(true, "", groupData);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result deleteGroup() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupData groupData = objectMapper.treeToValue(request().body().asJson(), AccountGroupData.class);
            groupData = accountServiceAdapter.deleteAccountGroup(getAccountId(), Long.valueOf(groupData.groupId));
            retData = new RetData(true, "", groupData);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result inviteAccount() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupInviteData inviteData = objectMapper.treeToValue(request().body().asJson(), AccountGroupInviteData.class);
            AccountGroupData groupData = accountServiceAdapter.inviteAccountGroup(Long.valueOf(inviteData.accountId), Long.valueOf(inviteData.groupId));
            retData = new RetData(true, "", groupData);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result joinAccountGroup() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupInviteData inviteData = objectMapper.treeToValue(request().body().asJson(), AccountGroupInviteData.class);
            AccountGroupData groupData = accountServiceAdapter.joinAccountGroup(getAccountId(), Long.valueOf(inviteData.groupId));
            retData = new RetData(true, "", groupData);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result quitAccountGroup() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupInviteData inviteData = objectMapper.treeToValue(request().body().asJson(), AccountGroupInviteData.class);
            AccountGroupData groupData = accountServiceAdapter.quitAccountGroup(getAccountId(), Long.valueOf(inviteData.groupId));
            retData = new RetData(true, "", groupData);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }


    public Result login() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountLoginData loginData = objectMapper.treeToValue(request().body().asJson(), AccountLoginData.class);
            AccountData accountData = accountServiceAdapter.loginAccount(loginData);
            retData = new RetData(true, "", accountData);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result logout() {
        RetData retData = null;
        try {
            final CommonProfile profile = getUserProfile();
            Long id = Long.valueOf(request().cookie("accountId").value());
            accountServiceAdapter.logoutAccountById(id);
            retData = new RetData(true, "");
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }
}
