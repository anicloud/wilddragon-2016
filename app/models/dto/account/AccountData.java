package models.dto.account;

import com.ani.earth.commons.dto.NationalcodeEnum;

import java.util.Set;

/**
 * Created by huangbin on 12/11/15.
 */
public class AccountData {
    public String accountId;
    public String email;
    public String password;
    public AccountType type;
    public String name;
    public String address;
    public String company;
    public String avatarUrl;
    public NationalcodeEnum region;
    public String phoneNumber;
    public AccountData() {
    }

    public AccountData(String accountId, String email, String password, AccountType type,
                       String name, String address, String company, String avatarUrl,NationalcodeEnum region, String phoneNumber) {
        this.accountId = accountId;
        this.email = email;
        this.password = password;
        this.type = type;
        this.name = name;
        this.address = address;
        this.company = company;
        this.avatarUrl = avatarUrl;
        this.region = region;
        this.phoneNumber = phoneNumber;
    }
}
