package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.dto.RetData;
import models.dto.account.*;
import models.service.account.AccountServiceAdapter;
import models.service.notification.NotificationService;
import org.apache.commons.lang3.exception.ExceptionUtils;
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

    @Resource
    private NotificationService notificationService;

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
//            notificationService.groupAddNotice(groupData);
            retData = new RetData(true, "", groupData);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
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
            notificationService.groupRemoveNotice(groupData);
            retData = new RetData(true, "", groupData);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result inviteAccount() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupInviteData inviteData = objectMapper.treeToValue(request().body().asJson(), AccountGroupInviteData.class);
            AccountData accountData = accountServiceAdapter.findAccountById(Long.valueOf(inviteData.accountId));
            AccountGroupData groupData = null;
            for(AccountData inviteAccountData : inviteData.accounts) {
                groupData = accountServiceAdapter.inviteAccountGroup(Long.valueOf(inviteAccountData.accountId), Long.valueOf(inviteData.groupId));
            }
            notificationService.groupInviteNotice(groupData, accountData,inviteData);
            retData = new RetData(true, "", groupData);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result joinAccountGroup() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupJoinData groupJoinData = objectMapper.treeToValue(request().body().asJson(), AccountGroupJoinData.class);
            if(groupJoinData.result.equals("true")) {
                AccountGroupData groupData = accountServiceAdapter.joinAccountGroup(getAccountId(), Long.valueOf(groupJoinData.groupId));
                AccountData accountData = accountServiceAdapter.findAccountById(getAccountId());
                notificationService.groupJoinNotice(groupData, accountData);
                retData = new RetData(true, "", groupData);
            }
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result quitAccountGroup() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupData groupData = objectMapper.treeToValue(request().body().asJson(), AccountGroupData.class);
            groupData = accountServiceAdapter.quitAccountGroup(getAccountId(), Long.valueOf(groupData.groupId));
            AccountData accountData = accountServiceAdapter.findAccountById(getAccountId());
            notificationService.groupQuitNotice(groupData, accountData);
            retData = new RetData(true, "", groupData);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result kickAccountGroup() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupKickData groupKickData = objectMapper.treeToValue(request().body().asJson(), AccountGroupKickData.class);
            AccountGroupData groupData = accountServiceAdapter.kickAccountGroup(Long.parseLong(groupKickData.accountId), groupKickData);
            AccountData accountData = accountServiceAdapter.findAccountById(Long.parseLong(groupKickData.accountId));
            notificationService.groupKickNotice(groupData, accountData);
            retData = new RetData(true, "", groupData);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result modifyAccountGroup() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            AccountGroupData groupModifyData = objectMapper.treeToValue(request().body().asJson(), AccountGroupData.class);
            AccountGroupData groupData = accountServiceAdapter.modifyAccountGroup(getAccountId(), groupModifyData);
            AccountData accountData = accountServiceAdapter.findAccountById(getAccountId());
            notificationService.groupModifyNotice(groupData);
            retData = new RetData(true, "", groupData);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
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
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
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
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }
}
