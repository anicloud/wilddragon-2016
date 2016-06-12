package models.service.account;

import com.ani.octopus.account.interfaces.AccountContactServiceFacade;
import com.ani.octopus.account.interfaces.AccountGroupServiceFacade;
import com.ani.octopus.account.interfaces.AccountServiceFacade;
import com.ani.octopus.account.interfaces.GroupJoinInvitationServiceFacade;
import com.ani.octopus.antenna.core.AntennaTemplate;
import com.ani.octopus.commons.accout.dto.AccountDto;
import com.ani.octopus.commons.accout.dto.AccountGroupDto;
import com.ani.octopus.commons.accout.dto.GroupType;
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
        groupDto.accounts = null;
        groupDto = accountGroupServiceFacade.save(groupDto);
        if (groupDto != null && accountDtos != null) {
            for (AccountDto accountDto : accountDtos) {
                accountServiceFacade.addAccountGroup(accountDto.accountId, groupDto.groupId);
                groupJoinInvitationServiceFacade.addGroup(accountDto.accountId, groupDto.groupId);
            }
            groupDto = accountGroupServiceFacade.getById(groupDto.groupId);
        }
        return AccountDataUtils.fromAccountGroupDto(groupDto);
    }

    @Override
    public AccountData updateAccount(AccountData accountData) {
        if (accountData == null) {
            return null;
        }
        AccountDto accountDto = AccountDataUtils.toAccountDto(accountData);
        return AccountDataUtils.fromAccountDto(accountDto);
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
            groupDto.accounts = null;
            accountGroupServiceFacade.modify(groupDto);
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
            groupDto = accountGroupServiceFacade.modify(groupDto);
            groupJoinInvitationServiceFacade.removeGroup(accountId, groupId);
            return AccountDataUtils.fromAccountGroupDto(groupDto);
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
            groupDto.accounts.remove(accountDto);
            groupDto = accountGroupServiceFacade.modify(groupDto);
            return AccountDataUtils.fromAccountGroupDto(groupDto);
        }
        return null;
    }
}
