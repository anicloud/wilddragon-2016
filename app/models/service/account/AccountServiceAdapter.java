package models.service.account;

import models.dto.account.*;

import java.util.Set;

/**
 * Created by huangbin on 12/11/15.
 */
public interface AccountServiceAdapter {
    // find
    AccountData findAccountById(Long accountId);
    AccountData findAccountByEmail(String email);
    AccountData findAccountByPhone(String phoneNumber);
    Set<AccountData> findAccountLike(String query);
    Set<AccountData> findAccountByNameLike(String name);
    Set<AccountData> findAccountByEmailLike(String email);

    AccountGroupData findGroup(Long groupId);
    Set<AccountGroupData> findGroups(Long accountId);

    Set<AccountData> findContacts(Long accountId);
    Set<AccountData> findContacts(String email);

    // create
    AccountData createAccount(AccountData accountData);
    AccountGroupData createAccountGroup(AccountGroupData accountGroupData);

    // update
    AccountData updateAccount(AccountData accountData);
    AccountGroupData updateAccountGroup(AccountGroupData groupData);

    // delete
    AccountData deleteAccountById(Long accountId);
    AccountData deleteAccountByEmail(String email);
    AccountData deleteAccountByPhoneNumber(String phoneNumber);

    AccountGroupData deleteAccountGroupByAccountId(Long accountId);
    AccountGroupData deleteAccountGroup(Long accountId, Long groupId);

    // login, logout
    AccountData loginAccount(AccountLoginData loginData);
    void logoutAccountByEmail(String email);
    void logoutAccountById(Long accountId);

    // invite, quit
    AccountGroupData inviteAccountGroup(Long accountId, Long groupId);
    AccountGroupData joinAccountGroup(Long accountId, Long groupId);
    AccountGroupData quitAccountGroup(Long accountId, Long groupId);

}
