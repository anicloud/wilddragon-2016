package models.service.account;

import models.dto.account.*;

import java.util.Set;

/**
 * Created by huangbin on 12/11/15.
 */
public interface AccountServiceAdapter {
    // get
    AccountData getAccountById(Long accountId);
    AccountData getAccountByEmail(String email);
    AccountData getAccountByPhoneNumber(String phoneNumber);

    AccountGroupData getAccountGroupByGroupId(Long groupId);
    Set<AccountGroupData> getGroupsByAccountId(Long accountId);
    Set<AccountGroupData> getGroupsByEmail(String email);
    Set<AccountGroupData> getGroupsByPhoneNumber(String phoneNumber);

    Set<AccountData> getContactsById(Long accountId);
    
    // create
    AccountData createAccount(AccountRegisterData registerData);
    AccountGroupData createAccountGroup(AccountGroupRegisterData registerData);

    // update
    AccountData updateAccount(AccountData account);
    AccountGroupData updateAccountGroup(AccountGroupData group);

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
