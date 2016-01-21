package models.dto.account;

import java.util.Set;

/**
 * Created by huangbin on 12/11/15.
 */
public class AccountData {
    public Long accountId;
    public String email;
    public String phoneNumber;

    public AccountType type;
    public String name;
    public String address;
    public String company;
    public String avatarUrl;

    public Set<AccountGroupData> groups;

    public AccountData(Long accountId, String email, String phoneNumber, AccountType type, String name, String address, String company, String avatarUrl, Set<AccountGroupData> groups) {
        this.accountId = accountId;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.type = type;
        this.name = name;
        this.address = address;
        this.company = company;
        this.avatarUrl = avatarUrl;
        this.groups = groups;
    }
}
