package models.dto.account;

import java.util.Set;

/**
 * Created by huangbin on 12/11/15.
 */
public class AccountGroupData {
    public String groupId;
    public String name;
    public AccountGroupType type;
    public AccountData owner;
    public Set<AccountData> accounts;

    public AccountGroupData() {
    }

    public AccountGroupData(String groupId, String name, AccountGroupType type, AccountData owner, Set<AccountData> accounts) {
        this.groupId = groupId;
        this.name = name;
        this.type = type;
        this.owner = owner;
        this.accounts = accounts;
    }
}
