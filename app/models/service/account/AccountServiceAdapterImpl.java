package models.service.account;

import com.ani.earth.commons.dto.AccountDto;
import com.ani.earth.commons.dto.AccountGroupDto;
import com.ani.earth.core.application.service.dtoadapter.AccountDtoAdapter;
import com.ani.earth.interfaces.AccountContactServiceFacade;
import com.ani.earth.interfaces.AccountGroupServiceFacade;
import com.ani.earth.interfaces.AccountServiceFacade;
import com.ani.earth.interfaces.GroupJoinInvitationServiceFacade;
import com.ani.octopus.antenna.core.AntennaTemplate;
import com.ani.octopus.antenna.core.service.account.AccountAccessService;
import com.ani.octopus.antenna.core.service.account.AccountGroupAccessService;
import com.ani.octopus.commons.object.dto.object.ObjectMainInfoDto;
import com.ani.octopus.commons.object.dto.object.ObjectMainQueryDto;
import com.ani.octopus.commons.object.dto.object.privilege.ObjectPrivilegeGrantDto;
import com.ani.octopus.commons.object.enumeration.AniObjectType;
import com.ani.octopus.commons.stub.enumeration.PrivilegeType;
import models.dto.account.*;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by huangbin on 12/16/15.
 */
@Component("accountServiceAdapter")
public class AccountServiceAdapterImpl implements AccountServiceAdapter {
    @Resource
    AccountGroupAccessService accountGroupAccessService;

    @Resource
    AccountAccessService accountAccessService;


    @Resource
    AntennaTemplate antennaTemplate;

    @Override
    public AccountData findAccountById(Long accountId) {
        if (accountId == null) {
            return null;
        }
        return AccountDataUtils.fromAccountDto(accountAccessService.getByAccountId(accountId));
    }

    @Override
    public AccountData findAccountByEmail(String email) {
        if (email == null || email.trim().length() == 0) {
            return null;
        }
        return AccountDataUtils.fromAccountDto(accountAccessService.getByEmail(email));
    }

    @Override
    public AccountData findAccountByPhone(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.trim().length() == 0) {
            return null;
        }
        return AccountDataUtils.fromAccountDto(accountAccessService.getByPhoneNumber(phoneNumber));
    }

    @Override
    public Set<AccountData> findAccountLike(String query) {
        if (query == null || query.trim().length() == 0) {
            return null;
        }
        return AccountDataUtils.fromAccountDtos(accountAccessService.getByEmailOrScreenNameLike(query));
    }

    @Override
    public Set<AccountData> findAccountByNameLike(String name) {
        if (name == null || name.trim().length() == 0) {
            return null;
        }
        return AccountDataUtils.fromAccountDtos(accountAccessService.getByScreenNameLike(name));
    }

    @Override
    public Set<AccountData> findAccountByEmailLike(String email) {
        if (email == null || email.trim().length() == 0) {
            return null;
        }
        return AccountDataUtils.fromAccountDtos(accountAccessService.getByEmailLike(email));
    }

    @Override
    public AccountGroupData findGroup(Long groupId) {
        if (groupId == null) {
            return null;
        }
        return AccountDataUtils.fromAccountGroupDto(accountGroupAccessService.getById(groupId));
    }

    @Override
    public Set<AccountGroupData> findGroups(Long accountId) {
        if (accountId == null) {
            return null;
        }
        Set<AccountGroupDto> groupDtos = accountAccessService.getAccountInGroups(accountId);
        if (groupDtos != null) {
            Set<AccountGroupData> groupDatas = new HashSet<>();
            for (AccountGroupDto groupDto : groupDtos) {
                groupDatas.add(AccountDataUtils.fromAccountGroupDto(
                        accountGroupAccessService.getById(groupDto.groupId)));
            }
            return groupDatas;
        } else {
            return null;
        }
    }

    @Override
    public Set<AccountData> findContacts(Long accountId) {
        if (accountId == null) {
            return null;
        }
        //return AccountDataUtils.fromAccountDtos(accountContactServiceFacade.getAllContacts(accountId));
        return null;
    }

    @Override
    public Set<AccountData> findContacts(String email) {
        if (email == null || email.trim().length() == 0) {
            return null;
        }
        AccountDto accountDto = accountAccessService.getByEmail(email);
        if (accountDto == null) {
            return null;
        }
        //return AccountDataUtils.fromAccountDtos(accountContactServiceFacade.getAllContacts(accountDto.accountId));
        return null;
    }

    @Override
    public AccountData createAccount(AccountData accountData) {
        if (accountData == null) {
            return null;
        }
        AccountDto accountDto = AccountDataUtils.toAccountDto(accountData);
        if (accountDto == null) {
            return null;
        }
        return AccountDataUtils.fromAccountDto(accountAccessService.save(accountDto));
    }

    @Override
    public AccountGroupData createAccountGroup(AccountGroupData groupData) {
        if (groupData == null) {
            return null;
        }
        groupData.type = AccountGroupType.CUSTOM;
        AccountGroupDto groupDto = AccountDataUtils.toAccountGroupDto(groupData);
        groupDto = accountGroupAccessService.createAccountGroup(groupDto);
        return AccountDataUtils.fromAccountGroupDto(groupDto);
    }

    @Override
    public AccountData updateAccount(AccountData accountData) {
        if (accountData == null) {
            return null;
        }
        AccountDto accountDto = AccountDataUtils.toAccountDto(accountData);
        return AccountDataUtils.fromAccountDto(accountAccessService.modify(accountDto));
    }

    @Override
    public AccountGroupData updateAccountGroup(AccountGroupData groupData) {
        if (groupData == null) {
            return null;
        }
        AccountGroupDto groupDto = AccountDataUtils.toAccountGroupDto(groupData);
        return AccountDataUtils.fromAccountGroupDto(accountGroupAccessService.save(groupDto));
    }

    @Override
    public AccountData deleteAccountById(Long accountId) {
        if (accountId == null) {
            return null;
        }
        AccountDto accountDto = accountAccessService.getByAccountId(accountId);
        if (accountDto != null) {
            accountAccessService.removeByAccountId(accountId, false);
        }
        return AccountDataUtils.fromAccountDto(accountDto);
    }

    @Override
    public AccountData deleteAccountByEmail(String email) {
        if (email == null || email.trim().length() == 0) {
            return null;
        }
        AccountDto accountDto = accountAccessService.getByEmail(email);
        if (accountDto != null) {
            accountAccessService.removeByEmail(email, false);
        }
        return AccountDataUtils.fromAccountDto(accountDto);
    }

    @Override
    public AccountData deleteAccountByPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.trim().length() == 0) {
            return null;
        }
        AccountDto accountDto = accountAccessService.getByPhoneNumber(phoneNumber);
        if (accountDto != null) {
            accountAccessService.removeByAccountId(accountDto.accountId, false);
        }
        return AccountDataUtils.fromAccountDto(accountDto);
    }

    @Override
    public AccountGroupData deleteAccountGroupByAccountId(Long accountId) {
        return null;
    }


    @Override
    public AccountGroupData deleteAccountGroup(Long accountId, Long groupId) {
        AccountGroupDto groupDto = accountGroupAccessService.getById(groupId);
        accountGroupAccessService.deleteAccountGroup(accountId, groupId);
        return AccountDataUtils.fromAccountGroupDto(groupDto);
    }

    @Override
    public AccountData loginAccount(AccountLoginData loginData) {
        return null;
    }

    @Override
    public void logoutAccountByEmail(String email) {

    }

    @Override
    public void logoutAccountById(Long accountId) {

    }

    @Override
    public Set<AccountGroupData> getAllInvitationGroup(Long accountId) {
        if (accountId ==null){
            return null;
        }
        Set<AccountGroupDto> groupDtos = accountGroupAccessService.getAllInvitedGroups(accountId);
        return AccountDataUtils.fromAccountGroupDtos(groupDtos);
    }

    @Override
    public AccountGroupData inviteAccountGroup(Long accountId, Long groupId) {
        if (accountId == null || groupId == null) {
            return null;
        }
        AccountGroupDto accountGroupDto = accountGroupAccessService.inviteAccountGroup(accountId, groupId);
        return AccountDataUtils.fromAccountGroupDto(accountGroupDto);
    }

    @Override
    public AccountGroupData joinAccountGroup(Long accountId, Long groupId) {
        if (accountId == null || groupId == null) {
            return null;
        }
        AccountGroupDto groupDto = accountGroupAccessService.joinAccountGroup(accountId, groupId);
        if(groupDto!=null) {
            return AccountDataUtils.fromAccountGroupDto(groupDto);
        }else return null;
    }

    @Override
    public AccountGroupData refuseAccountGroup(Long accountId, Long groupId) {
        if(accountId == null || groupId ==null){
            return null;
        }
        AccountGroupDto groupDto = accountGroupAccessService.refuseAccountGroup(accountId, groupId);
        if(groupDto!=null) {
            return AccountDataUtils.fromAccountGroupDto(groupDto);
        }else return null;
    }

    @Override
    public AccountGroupData quitAccountGroup(Long accountId, Long groupId) {
        if (accountId == null || groupId == null) {
            return null;
        }
        AccountGroupDto groupDto = accountGroupAccessService.quitAccountGroup(accountId, groupId);
        if(groupDto!=null) {
            return AccountDataUtils.fromAccountGroupDto(groupDto);
        }else return null;
    }

    @Override
    public AccountGroupData kickAccountGroup(Long accountId, AccountGroupKickData groupKickData) {
        if (accountId == null || groupKickData == null) {
            return null;
        }
        AccountGroupDto groupDto = accountGroupAccessService.kickAccountGroup(accountId, Long.parseLong(groupKickData.groupId),Long.parseLong(groupKickData.accountId));
        if(groupDto!=null) {
            return AccountDataUtils.fromAccountGroupDto(groupDto);
        }else return null;
    }

    @Override
    public AccountGroupData modifyAccountGroup(Long accountId, AccountGroupData groupModifyData) {
        if(accountId == null || groupModifyData == null){
            return null;
        }
        AccountGroupDto groupDto = accountGroupAccessService.getById(Long.valueOf(groupModifyData.groupId));
        if(!accountId.equals(groupDto.owner.accountId)){
            return null;
        }
        if(groupModifyData.name != null){
            groupDto.groupName = groupModifyData.name;
        }
        if(groupModifyData.type != null){
            groupDto.groupType = AccountDataUtils.toGroupType(groupModifyData.type);
        }
        groupDto = accountGroupAccessService.modify(groupDto);
        return AccountDataUtils.fromAccountGroupDto(groupDto);
    }

}
