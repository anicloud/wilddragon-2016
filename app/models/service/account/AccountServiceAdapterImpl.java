package models.service.account;

import com.ani.earth.commons.dto.AccountDto;
import com.ani.earth.commons.dto.AccountGroupDto;
import com.ani.earth.core.application.service.dtoadapter.AccountDtoAdapter;
import com.ani.earth.interfaces.AccountContactServiceFacade;
import com.ani.earth.interfaces.AccountGroupServiceFacade;
import com.ani.earth.interfaces.AccountServiceFacade;
import com.ani.earth.interfaces.GroupJoinInvitationServiceFacade;
import com.ani.octopus.antenna.core.AntennaTemplate;
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
    AccountServiceFacade accountServiceFacade;

    @Resource
    AccountGroupServiceFacade accountGroupServiceFacade;

    @Resource
    AccountContactServiceFacade accountContactServiceFacade;

    @Resource
    GroupJoinInvitationServiceFacade groupJoinInvitationServiceFacade;

    @Resource
    AntennaTemplate antennaTemplate;
//
    @Override
    public AccountData findAccountById(Long accountId) {
        if (accountId == null) {
            return null;
        }
        return AccountDataUtils.fromAccountDto(accountServiceFacade.getByAccountId(accountId));
    }

    @Override
    public AccountData findAccountByEmail(String email) {
        if (email == null || email.trim().length() == 0) {
            return null;
        }
        return AccountDataUtils.fromAccountDto(accountServiceFacade.getByEmail(email));
    }

    @Override
    public AccountData findAccountByPhone(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.trim().length() == 0) {
            return null;
        }
        return AccountDataUtils.fromAccountDto(accountServiceFacade.getByPhoneNumber(phoneNumber));
    }

    @Override
    public Set<AccountData> findAccountLike(String query) {
        if (query == null || query.trim().length() == 0) {
            return null;
        }
        return AccountDataUtils.fromAccountDtos(accountServiceFacade.getByEmailOrScreenNameLike(query));
    }

    @Override
    public Set<AccountData> findAccountByNameLike(String name) {
        if (name == null || name.trim().length() == 0) {
            return null;
        }
        return AccountDataUtils.fromAccountDtos(accountServiceFacade.getByScreenNameLike(name));
    }

    @Override
    public Set<AccountData> findAccountByEmailLike(String email) {
        if (email == null || email.trim().length() == 0) {
            return null;
        }
        return AccountDataUtils.fromAccountDtos(accountServiceFacade.getByEmailLike(email));
    }

    @Override
    public AccountGroupData findGroup(Long groupId) {
        if (groupId == null) {
            return null;
        }
        return AccountDataUtils.fromAccountGroupDto(accountGroupServiceFacade.getById(groupId));
    }

    @Override
    public Set<AccountGroupData> findGroups(Long accountId) {
        if (accountId == null) {
            return null;
        }
        Set<AccountGroupDto> groupDtos = accountServiceFacade.getAccountInGroups(accountId);
        if (groupDtos != null) {
            Set<AccountGroupData> groupDatas = new HashSet<>();
            for (AccountGroupDto groupDto : groupDtos) {
                groupDatas.add(AccountDataUtils.fromAccountGroupDto(
                        accountGroupServiceFacade.getById(groupDto.groupId)));
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
        return AccountDataUtils.fromAccountDtos(accountContactServiceFacade.getAllContacts(accountId));
    }

    @Override
    public Set<AccountData> findContacts(String email) {
        if (email == null || email.trim().length() == 0) {
            return null;
        }
        AccountDto accountDto = accountServiceFacade.getByEmail(email);
        if (accountDto == null) {
            return null;
        }
        return AccountDataUtils.fromAccountDtos(accountContactServiceFacade.getAllContacts(accountDto.accountId));
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
        return AccountDataUtils.fromAccountDto(accountServiceFacade.save(accountDto));
    }

    @Override
    public AccountGroupData createAccountGroup(AccountGroupData groupData) {
        if (groupData == null) {
            return null;
        }
        groupData.type = AccountGroupType.CUSTOM;
        AccountGroupDto groupDto = AccountDataUtils.toAccountGroupDto(groupData);
        Set<AccountDto> accountDtos = groupDto.accounts;
        if(accountDtos == null){
            accountDtos = new HashSet<>();
        }
        groupDto.accounts = null;
        groupDto = accountGroupServiceFacade.save(groupDto);
        accountServiceFacade.addAccountGroup(groupDto.owner.accountId, groupDto.groupId);
        for (AccountDto accountDto : accountDtos) {
            if(!accountDto.accountId.equals(groupDto.owner)){
                groupJoinInvitationServiceFacade.addGroup(accountDto.accountId, groupDto.groupId);
            }
        }
        groupDto.accounts = accountDtos;
        return AccountDataUtils.fromAccountGroupDto(groupDto);
    }

    @Override
    public AccountData updateAccount(AccountData accountData) {
        if (accountData == null) {
            return null;
        }
        AccountDto accountDto = AccountDataUtils.toAccountDto(accountData);
        return AccountDataUtils.fromAccountDto(accountServiceFacade.modify(accountDto));
    }

    @Override
    public AccountGroupData updateAccountGroup(AccountGroupData groupData) {
        if (groupData == null) {
            return null;
        }
        AccountGroupDto groupDto = AccountDataUtils.toAccountGroupDto(groupData);
        return AccountDataUtils.fromAccountGroupDto(accountGroupServiceFacade.save(groupDto));
    }

    @Override
    public AccountData deleteAccountById(Long accountId) {
        if (accountId == null) {
            return null;
        }
        AccountDto accountDto = accountServiceFacade.getByAccountId(accountId);
        if (accountDto != null) {
            accountServiceFacade.removeByAccountId(accountId, false);
        }
        return AccountDataUtils.fromAccountDto(accountDto);
    }

    @Override
    public AccountData deleteAccountByEmail(String email) {
        if (email == null || email.trim().length() == 0) {
            return null;
        }
        AccountDto accountDto = accountServiceFacade.getByEmail(email);
        if (accountDto != null) {
            accountServiceFacade.removeByEmail(email, false);
        }
        return AccountDataUtils.fromAccountDto(accountDto);
    }

    @Override
    public AccountData deleteAccountByPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.trim().length() == 0) {
            return null;
        }
        AccountDto accountDto = accountServiceFacade.getByPhoneNumber(phoneNumber);
        if (accountDto != null) {
            accountServiceFacade.removeByAccountId(accountDto.accountId, false);
        }
        return AccountDataUtils.fromAccountDto(accountDto);
    }

    @Override
    public AccountGroupData deleteAccountGroupByAccountId(Long accountId) {
        return null;
    }


    @Override
    public AccountGroupData deleteAccountGroup(Long accountId, Long groupId) {
        AccountGroupDto groupDto = accountGroupServiceFacade.getById(groupId);
        if (groupDto != null) {
            for(AccountDto accountDto:groupDto.accounts) {
                accountServiceFacade.removeAccountGroup(accountDto.accountId, groupDto.groupId);
            }
            accountGroupServiceFacade.remove(accountId, groupId);
        }

        try {
            // get owned devices
            List<ObjectMainInfoDto> objectDtos = antennaTemplate.objectInfoService.getObjectMainByAccountAndType(accountId, AniObjectType.DEVICE_OBJ, true, true);
            if (objectDtos != null) {
                for (ObjectMainInfoDto objectDto : objectDtos) {
                    ObjectMainQueryDto mainQueryDto = new ObjectMainQueryDto(objectDto.objectId);
                    Set<PrivilegeType> privilegeTypes = new HashSet<>();

                    ObjectPrivilegeGrantDto privilegeGrantDto = new ObjectPrivilegeGrantDto(groupId, privilegeTypes);
                    antennaTemplate.objectInfoService.grantAccountGroupPrivilege(mainQueryDto, privilegeGrantDto, true);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
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
        Set<AccountGroupDto> groupDtos = groupJoinInvitationServiceFacade.getAllInvitedGroups(accountId);
        return AccountDataUtils.fromAccountGroupDtos(groupDtos);
    }

    @Override
    public AccountGroupData inviteAccountGroup(Long accountId, Long groupId) {
        if (accountId == null || groupId == null) {
            return null;
        }
        groupJoinInvitationServiceFacade.addGroup(accountId, groupId);
        return AccountDataUtils.fromAccountGroupDto(accountGroupServiceFacade.getById(groupId));
    }

    @Override
    public AccountGroupData joinAccountGroup(Long accountId, Long groupId) {
        if (accountId == null || groupId == null) {
            return null;
        }
        AccountGroupDto groupDto = accountGroupServiceFacade.getById(groupId);
        AccountDto accountDto = accountServiceFacade.getByAccountId(accountId);
        if (groupDto != null && accountDto != null) {
            groupDto.accounts.add(accountDto);
            //accountDto.groupSet.add(groupDto);
            accountServiceFacade.modify(accountDto);
            accountServiceFacade.addAccountGroup(accountId, groupId);
            groupJoinInvitationServiceFacade.removeGroup(accountId, groupId);
            return AccountDataUtils.fromAccountGroupDto(groupDto);
        }
        return null;
    }

    @Override
    public AccountGroupData refuseAccountGroup(Long accountId, Long groupId) {
        if(accountId == null || groupId ==null){
            return null;
        }
        AccountGroupDto groupDto = accountGroupServiceFacade.getById(groupId);
        AccountDto accountDto = accountServiceFacade.getByAccountId(accountId);
        if(groupDto !=null && accountDto!= null) {
            groupJoinInvitationServiceFacade.removeGroup(accountId, groupId);
            return AccountDataUtils.fromAccountGroupDto(groupDto);
        }
        if(groupDto ==null){
            groupJoinInvitationServiceFacade.removeGroup(accountId,groupId);
        }
        return null;
    }

    @Override
    public AccountGroupData quitAccountGroup(Long accountId, Long groupId) {
        if (accountId == null || groupId == null) {
            return null;
        }
        AccountGroupDto groupDto = accountGroupServiceFacade.getById(groupId);
        AccountDto accountDto = accountServiceFacade.getByAccountId(accountId);
        if (groupDto != null && accountDto != null) {
            accountServiceFacade.removeAccountGroup(accountId, groupId);
            return AccountDataUtils.fromAccountGroupDto(accountGroupServiceFacade.getById(groupDto.groupId));
        }
        return null;
    }

    @Override
    public AccountGroupData kickAccountGroup(Long accountId, AccountGroupKickData groupKickData) {
        if (accountId == null || groupKickData == null) {
            return null;
        }
        AccountGroupDto groupDto = accountGroupServiceFacade.getById(Long.valueOf(groupKickData.groupId));
        AccountDto accountDto = accountServiceFacade.getByAccountId(accountId);
        if (groupDto == null || accountDto == null || accountId.equals(groupKickData.accountId)) {
            return null;
        }
        accountServiceFacade.removeAccountGroup(accountDto.accountId, groupDto.groupId);
        return AccountDataUtils.fromAccountGroupDto(accountGroupServiceFacade.getById(groupDto.groupId));
    }

    @Override
    public AccountGroupData modifyAccountGroup(Long accountId, AccountGroupData groupModifyData) {
        if(accountId == null || groupModifyData == null){
            return null;
        }
        AccountGroupDto groupDto = accountGroupServiceFacade.getById(Long.valueOf(groupModifyData.groupId));
        if(!accountId.equals(groupDto.owner.accountId)){
            return null;
        }
        if(groupModifyData.name != null){
            groupDto.groupName = groupModifyData.name;
        }
        if(groupModifyData.type != null){
            groupDto.groupType = AccountDataUtils.toGroupType(groupModifyData.type);
        }
        Set<AccountDto> accountDtos = groupDto.accounts;
        if(accountDtos == null){
            accountDtos = new HashSet<>();
        }
        groupDto.accounts = null;
        groupDto = accountGroupServiceFacade.modify(groupDto);
        for(AccountDto account:accountDtos){
            accountServiceFacade.addAccountGroup(account.accountId, groupDto.groupId);
        }
        groupDto.accounts = accountDtos;
        return AccountDataUtils.fromAccountGroupDto(groupDto);
    }

}
