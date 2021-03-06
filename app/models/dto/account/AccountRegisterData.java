package models.dto.account;

import com.ani.earth.commons.enumeration.AccountType;

/**
 * Created by huangbin on 12/11/15.
 */
public class AccountRegisterData {
    public String email;
    public String password;
    public String phoneNumber;

    public AccountType type;
    public String name;
    public String address;
    public String company;
    public String avatarUrl;
}
