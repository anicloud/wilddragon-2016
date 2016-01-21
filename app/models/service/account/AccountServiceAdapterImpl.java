package models.service.account;

import com.ani.octopus.account.interfaces.AccountContactServiceFacade;
import com.ani.octopus.account.interfaces.AccountGroupServiceFacade;
import com.ani.octopus.account.interfaces.AccountServiceFacade;
import com.ani.octopus.account.interfaces.GroupJoinInvitationServiceFacade;
import com.ani.octopus.commons.accout.dto.AccountDto;
import com.ani.octopus.commons.accout.dto.AccountGroupDto;
import models.dto.account.*;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.HashSet;
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
//
    @Override
    public AccountData getAccountById(Long accountId) {
        return AccountDtoUtils.fromAccountDto(accountServiceFacade.getByAccountId(accountId));
    }

    @Override
    public AccountData getAccountByEmail(String email) {
        return AccountDtoUtils.fromAccountDto(accountServiceFacade.getByEmail(email));
    }

    @Override
    public AccountData getAccountByPhoneNumber(String phoneNumber) {
        return AccountDtoUtils.fromAccountDto(accountServiceFacade.getByPhoneNumber(phoneNumber));
    }

    @Override
    public AccountGroupData getAccountGroupByGroupId(Long groupId) {
        return AccountDtoUtils.fromAccountGroupDto(accountGroupServiceFacade.getById(groupId));
    }

    @Override
    public Set<AccountGroupData> getGroupsByAccountId(Long accountId) {
        AccountData accountData = getAccountById(accountId);
        if (accountData != null) {
            return accountData.groups;
        } else {
            return null;
        }
    }

    @Override
    public Set<AccountGroupData> getGroupsByEmail(String email) {
        AccountData accountData = getAccountByEmail(email);
        if (accountData != null) {
            return accountData.groups;
        } else {
            return null;
        }
    }

    @Override
    public Set<AccountGroupData> getGroupsByPhoneNumber(String phoneNumber) {
        AccountData accountData = getAccountByPhoneNumber(phoneNumber);
        if (accountData != null) {
            return accountData.groups;
        } else {
            return null;
        }
    }

    @Override
    public Set<AccountData> getContactsById(Long accountId) {
        Set<AccountDto> accountDtos = accountContactServiceFacade.getAllContacts(accountId);
        return AccountDtoUtils.fromAccountDtos(accountDtos);
    }

    @Override
    public AccountData createAccount(AccountRegisterData registerData) {
        AccountDto registerDto = AccountDtoUtils.toAccountDto(registerData);
        if (registerDto == null) {
            return null;
        }
        return AccountDtoUtils.fromAccountDto(accountServiceFacade.save(registerDto));
    }

    @Override
    public AccountGroupData createAccountGroup(AccountGroupRegisterData registerData) {
        AccountGroupDto groupDto = AccountDtoUtils.toAccountGroupDto(registerData);
        groupDto.owner = accountServiceFacade.getByAccountId(registerData.owner);
        return AccountDtoUtils.fromAccountGroupDto(accountGroupServiceFacade.save(groupDto));
    }

    @Override
    public AccountData updateAccount(AccountData account) {
        AccountDto accountDto = AccountDtoUtils.toAccountDto(account);
        return AccountDtoUtils.fromAccountDto(accountDto);
    }

    @Override
    public AccountGroupData updateAccountGroup(AccountGroupData group) {
        AccountGroupDto groupDto = AccountDtoUtils.toAccountGroupDto(group);
        groupDto.accounts = new HashSet<>();
        for (Long id : group.accounts) {
            groupDto.accounts.add(accountServiceFacade.getByAccountId(id));
        }
        return AccountDtoUtils.fromAccountGroupDto(accountGroupServiceFacade.save(groupDto));
    }

    @Override
    public AccountData deleteAccountById(Long accountId) {
        AccountDto accountDto = accountServiceFacade.getByAccountId(accountId);
        if (accountDto != null) {
            accountServiceFacade.removeByAccountId(accountId, false);
        }
        return AccountDtoUtils.fromAccountDto(accountDto);
    }

    @Override
    public AccountData deleteAccountByEmail(String email) {
        AccountDto accountDto = accountServiceFacade.getByEmail(email);
        if (accountDto != null) {
            accountServiceFacade.removeByEmail(email, false);
        }
        return AccountDtoUtils.fromAccountDto(accountDto);
    }

    @Override
    public AccountData deleteAccountByPhoneNumber(String phoneNumber) {
        AccountDto accountDto = accountServiceFacade.getByPhoneNumber(phoneNumber);
        if (accountDto != null) {
            accountServiceFacade.removeByAccountId(accountDto.accountId, false);
        }
        return AccountDtoUtils.fromAccountDto(accountDto);
    }

    @Override
    public AccountGroupData deleteAccountGroupByAccountId(Long accountId) {
        return null;
    }


    @Override
    public AccountGroupData deleteAccountGroup(Long accountId, Long groupId) {
        AccountGroupDto groupDto = accountGroupServiceFacade.getById(groupId);
        if (groupDto != null) {
            accountGroupServiceFacade.remove(accountId, groupId);
        }
        return AccountDtoUtils.fromAccountGroupDto(groupDto);
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
        groupJoinInvitationServiceFacade.addGroup(accountId, groupId);
        return AccountDtoUtils.fromAccountGroupDto(accountGroupServiceFacade.getById(groupId));
    }

    @Override
    public AccountGroupData joinAccountGroup(Long accountId, Long groupId) {
        AccountGroupDto groupDto = accountGroupServiceFacade.getById(groupId);
        AccountDto accountDto = accountServiceFacade.getByAccountId(accountId);
        if (groupDto != null && accountDto != null) {
            groupDto.accounts.add(accountDto);
            groupDto = accountGroupServiceFacade.modify(groupDto);
            groupJoinInvitationServiceFacade.removeGroup(accountId, groupId);
            return AccountDtoUtils.fromAccountGroupDto(groupDto);
        }
        return null;
    }

    @Override
    public AccountGroupData quitAccountGroup(Long accountId, Long groupId) {
        AccountGroupDto groupDto = accountGroupServiceFacade.getById(groupId);
        AccountDto accountDto = accountServiceFacade.getByAccountId(accountId);
        if (groupDto != null && accountDto != null) {
            groupDto.accounts.remove(accountDto);
            groupDto = accountGroupServiceFacade.modify(groupDto);
            return AccountDtoUtils.fromAccountGroupDto(groupDto);
        }
        return null;
    }
}
