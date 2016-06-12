package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.dto.RetData;
import models.dto.device.*;
import models.dto.function.FunctionMetaData;
import models.service.device.DeviceServiceAdapter;
import models.service.function.FunctionServiceAdapter;
import org.pac4j.core.profile.CommonProfile;
import org.pac4j.play.java.JavaController;
import org.pac4j.play.java.RequiresAuthentication;
import org.springframework.stereotype.Component;
import play.libs.Json;
import play.mvc.*;

import javax.annotation.Resource;
import java.util.List;
import java.util.Set;

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
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result bindDevice() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceBindData bindData = objectMapper.treeToValue(request().body().asJson(), DeviceBindData.class);
            DeviceMasterData device = deviceServiceAdapter.bindDevice(bindData.physicalId, bindData.physicalAddress, getAccountId());
            if (device != null) {
                retData = new RetData(true, "", device);
            } else {
                retData = new RetData(false, "unknown device");
            }
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }

    public Result unbindDevice() {
        RetData retData = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceBindData bindData = objectMapper.treeToValue(request().body().asJson(), DeviceBindData.class);
            DeviceMasterData device = deviceServiceAdapter.unbindDevice(Long.valueOf(bindData.deviceId), getAccountId());
            retData = new RetData(true, "", device);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
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
            retData = new RetData(true, "", deviceMasterData);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
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
            retData = new RetData(true, "", permissionDatas);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
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
            retData = new RetData(true, "", permissionDatas);
        } catch (Exception e) {
            retData = new RetData(false, e.getMessage());
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
            retData = new RetData(false, e.getMessage());
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
            retData = new RetData(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retData));
        }
    }
}
