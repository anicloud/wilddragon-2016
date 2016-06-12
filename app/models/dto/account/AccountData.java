package models.dto.account;

import java.util.Set;

/**
 * Created by huangbin on 12/11/15.
 */
public class AccountData {
    public String accountId;
    public String email;
    public String password;
    public String phoneNumber;

    public AccountType type;
    public String name;
    public String address;
    public String company;
    public String avatarUrl;

    public AccountData() {
    }

    public AccountData(String accountId, String email, String password, String phoneNumber, AccountType type, String name, String address, String company, String avatarUrl) {
        this.accountId = accountId;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.type = type;
        this.name = name;
        this.address = address;
        this.company = company;
        this.avatarUrl = avatarUrl;
    }
}
