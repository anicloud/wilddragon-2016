package controllers;

import com.ani.octopus.antenna.core.AntennaTemplate;
import com.ani.octopus.antenna.core.dto.stub.StubInvocationDto;
import com.ani.octopus.antenna.core.service.stub.AniStubMetaInfoService;
import com.ani.octopus.commons.dto.object.ObjectQueryDto;
import com.ani.octopus.commons.object.dto.object.ObjectMainInfoDto;
import com.ani.octopus.commons.object.dto.object.ObjectMainQueryDto;
import com.ani.octopus.commons.object.dto.object.ObjectSlaveQueryDto;
import com.ani.octopus.commons.stub.dto.StubDto;
import com.ani.octopus.stub.core.domain.stub.Stub;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.dto.RetData;
import models.dto.account.AccountData;
import models.dto.account.AccountGroupData;
import models.dto.device.*;
import models.dto.function.FunctionMetaData;
import models.service.account.AccountServiceAdapter;
import models.service.device.DeviceServiceAdapter;
import models.service.function.FunctionServiceAdapter;
import models.service.notification.NotificationService;
import org.apache.commons.lang.exception.ExceptionUtils;
import org.pac4j.core.profile.CommonProfile;
import org.pac4j.play.java.JavaController;
import org.pac4j.play.java.RequiresAuthentication;
import org.springframework.stereotype.Component;
import play.libs.Json;
import play.mvc.Result;

import javax.annotation.Resource;
import java.util.*;

/**
 * Created by huangbin on 12/14/15.
 */

@Component
//@Security.Authenticated(AccessAuthenticator.class)
@RequiresAuthentication(clientName = "CasClient")
public class DeviceController extends JavaController {
    @Resource
    private DeviceServiceAdapter deviceServiceAdapter;

    @Resource
    private FunctionServiceAdapter functionServiceAdapter;

    @Resource
    private AccountServiceAdapter accountServiceAdapter;

    @Resource
    private NotificationService notificationService;

    @Resource
    private AntennaTemplate antennaTemplate;

    private Long getAccountId() {
        final CommonProfile profile = getUserProfile();
        return Long.parseLong((String) profile.getAttribute("accountId"));
    }

    public Result getAllDevices() {
        RetData retData = null;
        try {
            List<DeviceMasterData> devices = deviceServiceAdapter.findDevices(getAccountId());
            retData = new RetData(true, "", devices);
        } catch (Exception e) {
            e.printStackTrace();
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }
    //search for all available slaves list nearby
    public Result searchAllSlaves(){
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceSearchSlavesData searchSlavesData = objectMapper.treeToValue(request().body().asJson(),DeviceSearchSlavesData.class);
            Long deviceId = Long.parseLong(searchSlavesData.deviceId);
            ObjectMainInfoDto objectMainInfoDto = antennaTemplate.objectInfoService.getObjectMain(new ObjectMainQueryDto(deviceId),false);
            Long owner = objectMainInfoDto.owner.accountId;
            //only owner can search for slaves
            if(getAccountId().equals(owner)) {
                List<Integer> result = deviceServiceAdapter.searchForSlavesList(deviceId);
                if(result!=null) {
                    SlaveListData slaveListData = new SlaveListData();
                    slaveListData.slaveIdList = result;
                    retData = new RetData(true, "search request success",slaveListData);
                }else{
                    retData = new RetData(false, "search request fail");
                }
            }else{
                retData = new RetData(false,"fail,no privilege");
            }
        }catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        }
        return ok(Json.toJson(retData));
    }

    //add new slaves chosen by owner of master device
    public Result addNewSlaves(){
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceAddSlavesData addSlavesData = objectMapper.treeToValue(request().body().asJson(),DeviceAddSlavesData.class);
            Long deviceId = Long.parseLong(addSlavesData.deviceId);
            List<Integer> newSlavesList = addSlavesData.slaveIdList;
            ObjectMainInfoDto objectMainInfoDto = antennaTemplate.objectInfoService.getObjectMain(new ObjectMainQueryDto(deviceId),false);
            Long owner = objectMainInfoDto.owner.accountId;
            if(getAccountId().equals(owner)) {
                boolean result = deviceServiceAdapter.addNewSlaves(deviceId, newSlavesList);
                if(result) {
                    retData = new RetData(true, "addSlaves request success");
                }else{
                    retData = new RetData(false, "addSlaves request fail");
                }
            }else{
                retData = new RetData(false,"fail,no privilege");
            }
        }catch (Exception e)
        {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        }
        return ok(Json.toJson(retData));
    }

    public Result bindDevice() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceBindData bindData = objectMapper.treeToValue(request().body().asJson(), DeviceBindData.class);
            Integer physicalId = Integer.parseInt(bindData.physicalId);
            Long physicalAddress = Long.parseLong(bindData.physicalAddress);
            DeviceMasterData device = deviceServiceAdapter.bindDevice(physicalId,physicalAddress, getAccountId());
            AccountData accountData = accountServiceAdapter.findAccountById(getAccountId());
            //notificationService.deviceBindNotice(device, accountData);
            if (device != null) {
                retData = new RetData(true, "", device);
            } else {
                retData = new RetData(false, "unknown device or has been bound already");
            }
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result unbindDevice() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceunBindData unbindData = objectMapper.treeToValue(request().body().asJson(), DeviceunBindData.class);
            if(unbindData.permissions!=null) {
                for (PermissionData permissionData : unbindData.permissions) {
                    DeviceShareData shareData = new DeviceShareData();
                    shareData.deviceId = unbindData.deviceId;
                    shareData.groupId = permissionData.groupId;
                    shareData.types = permissionData.types;
                    List<PermissionData> permissionDatas = deviceServiceAdapter.unshareDevice(shareData);
                    DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(Long.valueOf(shareData.deviceId));
                    AccountData accountData = accountServiceAdapter.findAccountById(getAccountId());
                    AccountGroupData accountGroupData = accountServiceAdapter.findGroup(Long.valueOf(shareData.groupId));
                    notificationService.deviceUnShareNotice(deviceMasterData, accountData, accountGroupData);
                }
            }
            DeviceMasterData device = deviceServiceAdapter.unbindDevice(Long.valueOf(unbindData.deviceId), getAccountId());
            //AccountData accountData = accountServiceAdapter.findAccountById(getAccountId());
            //notificationService.deviceUnbindNotice(device, accountData);

            retData = new RetData(true, "", device);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result updateDevice() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceMasterData deviceMasterData = objectMapper.treeToValue(request().body().asJson(), DeviceMasterData.class);
            deviceMasterData = deviceServiceAdapter.updateDevice(deviceMasterData);
            AccountData accountData = accountServiceAdapter.findAccountById(getAccountId());
            List<AccountData> accounts = new ArrayList<>(Collections.EMPTY_LIST);
            Set<String> accountIds = new HashSet<>();
            for(String groupId:deviceMasterData.accountGroups){
                AccountGroupData groupData = accountServiceAdapter.findGroup(Long.valueOf(groupId));
                for(AccountData account:groupData.accounts){
                    if(!accountIds.contains(account.accountId)){
                        accountIds.add(account.accountId);
                        accounts.add(account);
                    }
                }
            }
            notificationService.deviceUpdateNotice(deviceMasterData, accountData, accounts);
            retData = new RetData(true, "", deviceMasterData);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result shareDevice() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceShareData shareData = objectMapper.treeToValue(request().body().asJson(), DeviceShareData.class);
            List<PermissionData> permissionDatas = deviceServiceAdapter.shareDevice(shareData);
            DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(Long.valueOf(shareData.deviceId));
            AccountData accountData = accountServiceAdapter.findAccountById(getAccountId());
            AccountGroupData accountGroupData = accountServiceAdapter.findGroup(Long.valueOf(shareData.groupId));
            notificationService.deviceShareNotice(deviceMasterData, accountData, accountGroupData);
            retData = new RetData(true, "", permissionDatas);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result unshareDevice() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceShareData shareData = objectMapper.treeToValue(request().body().asJson(), DeviceShareData.class);
            List<PermissionData> permissionDatas = deviceServiceAdapter.unshareDevice(shareData);
            DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(Long.valueOf(shareData.deviceId));
            AccountData accountData = accountServiceAdapter.findAccountById(getAccountId());
            AccountGroupData accountGroupData = accountServiceAdapter.findGroup(Long.valueOf(shareData.groupId));
            notificationService.deviceUnShareNotice(deviceMasterData, accountData, accountGroupData);
            retData = new RetData(true, "", permissionDatas);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result findSlaveFunctions(Long masterId, Integer slaveId) {
        RetData retData = null;
        try {
            List<FunctionMetaData> metaDatas = functionServiceAdapter.findFunctionMetasByDevice(masterId, slaveId);
            retData = new RetData(true, "", metaDatas);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result findMasterFunctions(Long masterId) {
        RetData retData = null;
        try {
            List<FunctionMetaData> metaDatas = functionServiceAdapter.findFunctionMetasByDevice(masterId);
            retData = new RetData(true, "", metaDatas);
        } catch (Exception e) {
            retData = new RetData(false, ExceptionUtils.getStackTrace(e));
        } finally {
            return ok(Json.toJson(retData));
        }
    }
}
