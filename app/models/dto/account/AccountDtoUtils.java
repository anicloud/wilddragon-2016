package models.dto.account;

import com.ani.octopus.commons.accout.dto.AccountDto;
import com.ani.octopus.commons.accout.dto.AccountGroupDto;
import com.ani.octopus.commons.accout.dto.AccountInfoDto;
import com.ani.octopus.commons.accout.dto.GroupType;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by huangbin on 12/16/15.
 */
public class AccountDtoUtils {
    public static AccountType fromAccountType(com.ani.octopus.commons.accout.dto.AccountType dtoType) {
        AccountType type = AccountType.PERSONAL;
        if (dtoType == com.ani.octopus.commons.accout.dto.AccountType.ORGANIZATIONAL) {
            type = AccountType.ORGANIZATIONAL;
        } else if (dtoType == com.ani.octopus.commons.accout.dto.AccountType.ROOT) {
            type = AccountType.ROOT;
        }
        return type;
    }

    public static AccountGroupType fromGroupType(GroupType dtoType) {
        AccountGroupType type = AccountGroupType.CUSTOM;
        if (dtoType == GroupType.SYSTEM) {
            type = AccountGroupType.SYSTEM;
        }
        return type;
    }

    public static Set<AccountData> fromAccountDtos(Set<AccountDto> accountDtos) {
        if (accountDtos == null) {
            return null;
        }
        Set<AccountData> accountDatas = new HashSet<>();
        for (AccountDto accountDto : accountDtos) {
            accountDatas.add(fromAccountDto(accountDto));
        }
        return accountDatas;
    }

    public static Set<AccountGroupData> fromAccountGroupDtos(Set<AccountGroupDto> groupDtos) {
        if (groupDtos == null) {
            return null;
        }
        Set<AccountGroupData> groupDatas = new HashSet<>();
        for (AccountGroupDto groupDto : groupDtos) {
            groupDatas.add(fromAccountGroupDto(groupDto));
        }
        return groupDatas;
    }

    public static AccountGroupData fromAccountGroupDto(AccountGroupDto groupDto) {
        if (groupDto == null) {
            return null;
        }
        // group accounts
        Set<Long> accountIds = new HashSet<>();
        for (AccountDto accountDto : groupDto.accounts) {
            accountIds.add(accountDto.accountId);
        }
        AccountGroupData groupData = new AccountGroupData(
                String.valueOf(groupDto.groupId),
                groupDto.groupName,
                fromGroupType(groupDto.groupType),
                fromAccountDto(groupDto.owner),
                fromAccountDtos(groupDto.accounts)
        );
        return groupData;
    }

    public static AccountData fromAccountDto(AccountDto accountDto) {
        if (accountDto == null) {
            return null;
        }
        AccountData accountData = new AccountData(
                String.valueOf(accountDto.accountId),
                accountDto.email,
                accountDto.password,
                accountDto.accountInfo.phoneNumber,
                fromAccountType(accountDto.accountType),
                accountDto.screenName,
                accountDto.accountInfo.address,
                accountDto.accountInfo.company,
                accountDto.accountInfo.photoPath
        );
        return accountData;
    }

    public static com.ani.octopus.commons.accout.dto.AccountType toAccountType(AccountType dtoType) {
        com.ani.octopus.commons.accout.dto.AccountType type =
                com.ani.octopus.commons.accout.dto.AccountType.PERSONAL;
        if (dtoType == AccountType.ORGANIZATIONAL) {
            type = com.ani.octopus.commons.accout.dto.AccountType.ORGANIZATIONAL;
        } else if (dtoType == AccountType.ROOT) {
            type = com.ani.octopus.commons.accout.dto.AccountType.ROOT;
        }
        return type;
    }

    public static GroupType toGroupType(AccountGroupType type) {
        GroupType dtoType = GroupType.CUSTOM;
        if (type == AccountGroupType.SYSTEM) {
            dtoType = GroupType.SYSTEM;
        }
        return dtoType;
    }

    public static AccountDto toAccountDto(AccountRegisterData data) {
        if (data == null) {
            return null;
        }
        AccountInfoDto infoDto = new AccountInfoDto(data.phoneNumber, data.address,
                data.company, data.avatarUrl);
        AccountDto accountDto = new AccountDto();
        accountDto.screenName = data.name;
        accountDto.email = data.email;
        accountDto.password = data.password;
        accountDto.accountType = toAccountType(data.type);
        accountDto.accountInfo = infoDto;
        return accountDto;
    }

    public static AccountDto toAccountDto(AccountData data) {
        if (data == null) {
            return null;
        }
        AccountInfoDto infoDto = new AccountInfoDto(data.phoneNumber, data.address,
                data.company, data.avatarUrl);
        AccountDto accountDto = new AccountDto();
        accountDto.screenName = data.name;
        accountDto.email = data.email;
        accountDto.accountType = toAccountType(data.type);
        accountDto.accountInfo = infoDto;
        return accountDto;
    }

    public static AccountGroupDto toAccountGroupDto(AccountGroupRegisterData data) {
        AccountGroupDto groupDto = new AccountGroupDto();
        groupDto.groupName = data.name;
        groupDto.groupType = toGroupType(data.type);
        groupDto.accounts = null;
        return groupDto;
    }

    public static AccountGroupDto toAccountGroupDto(AccountGroupData data) {
        AccountGroupDto groupDto = new AccountGroupDto();
        groupDto.groupName = data.name;
        groupDto.groupType = toGroupType(data.type);
        groupDto.accounts = null;
        return groupDto;
    }

}
