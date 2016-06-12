package models.dto.account;

import com.ani.octopus.commons.accout.dto.AccountDto;
import com.ani.octopus.commons.accout.dto.AccountGroupDto;
import com.ani.octopus.commons.accout.dto.AccountInfoDto;
import com.ani.octopus.commons.accout.dto.GroupType;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by huangbin on 12/16/15.
 */
public class AccountDataUtils {
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


    public static AccountData fromAccountDto(AccountDto accountDto) {
        if (accountDto == null) {
            return null;
        }
        AccountData accountData = new AccountData(
                String.valueOf(accountDto.accountId),
                accountDto.email,
                "",
                accountDto.accountInfo.phoneNumber,
                fromAccountType(accountDto.accountType),
                accountDto.screenName,
                accountDto.accountInfo.address,
                accountDto.accountInfo.company,
                accountDto.accountInfo.photoPath
        );
        return accountData;
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

    public static Set<AccountData> fromAccountDtos(List<AccountDto> accountDtos) {
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

    public static Set<AccountGroupData> fromAccountGroupDtos(List<AccountGroupDto> groupDtos) {
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
        Set<String> accountIds = null;
        if (groupDto.accounts != null) {
            accountIds = new HashSet<>();
            for (AccountDto accountDto : groupDto.accounts) {
                accountIds.add(String.valueOf(accountDto.accountId));
            }
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

    public static AccountDto toAccountDto(AccountData accountData) {
        if (accountData == null) {
            return null;
        }
        AccountInfoDto infoDto = new AccountInfoDto(accountData.phoneNumber, accountData.address,
                accountData.company, accountData.avatarUrl);
        AccountDto accountDto = new AccountDto();
        accountDto.accountId = Long.parseLong(accountData.accountId);
        accountDto.screenName = accountData.name;
        accountDto.email = accountData.email;
        accountDto.password = accountData.password;
        accountDto.accountType = toAccountType(accountData.type);
        accountDto.accountInfo = infoDto;
        return accountDto;
    }

    public static Set<AccountDto> toAccountDtos(Set<AccountData> accountDatas) {
        if (accountDatas == null) {
            return null;
        }
        Set<AccountDto> accountDtos = new HashSet<>();
        for (AccountData accountData : accountDatas) {
            accountDtos.add(toAccountDto(accountData));
        }
        return accountDtos;
    }

    public static AccountGroupDto toAccountGroupDto(AccountGroupData groupData) {
        if (groupData == null) {
            return null;
        }
        AccountGroupDto groupDto = new AccountGroupDto();
        groupDto.groupName = groupData.name;
        groupDto.groupType = toGroupType(groupData.type);
        groupDto.owner = toAccountDto(groupData.owner);
        groupDto.accounts = toAccountDtos(groupData.accounts);
        return groupDto;
    }

}