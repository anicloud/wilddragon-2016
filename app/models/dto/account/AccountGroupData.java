package models.dto.account;

import java.util.Set;

/**
 * Created by huangbin on 12/11/15.
 */
public class AccountGroupData {
    public Long groupId;
    public Long owner;
    public String name;
    public AccountGroupType type;

    public Set<Long> accounts;

    public AccountGroupData(Long groupId, Long owner, String name, AccountGroupType type, Set<Long> accounts) {
        this.groupId = groupId;
        this.owner = owner;
        this.name = name;
        this.type = type;
        this.accounts = accounts;
    }
}
