package controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import models.domain.security.AccessAuthenticator;
import models.dto.RetDataDto;
import models.dto.device.DeviceBindData;
import models.dto.device.DeviceMasterData;
import models.dto.device.DeviceShareData;
import models.service.account.AccountServiceAdapter;
import models.service.device.DeviceServiceAdapter;
import org.springframework.stereotype.Component;
import play.libs.Json;
import play.mvc.*;

import javax.annotation.Resource;
import java.util.Set;

/**
 * Created by huangbin on 12/14/15.
 */

@Component
@Security.Authenticated(AccessAuthenticator.class)
public class DeviceController extends Controller {
    @Resource
    private DeviceServiceAdapter deviceServiceAdapter;

    public Result getAllDevices() {
        RetDataDto retDataDto = null;
        try {
            Long accountId = Long.valueOf(request().cookie("accountId").value());
            Set<DeviceMasterData> devices = deviceServiceAdapter.getDevicesByAccount(accountId);
            retDataDto = new RetDataDto(true, "", devices);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result bindDevice() {
        RetDataDto retDataDto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceBindData bindData = objectMapper.treeToValue(request().body().asJson(), DeviceBindData.class);
            DeviceMasterData device = deviceServiceAdapter.getDeviceByPhyIdAndPhyAddress(bindData.physicalId, bindData.physicalAddress);
            if (device != null) {
                retDataDto = new RetDataDto(true, "", deviceServiceAdapter.bindDevice(device.deviceId, bindData.accountId));
            } else {
                retDataDto = new RetDataDto(false, "unknown device");
            }
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result unbindDevice() {
        RetDataDto retDataDto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceBindData bindData = objectMapper.treeToValue(request().body().asJson(), DeviceBindData.class);
            deviceServiceAdapter.unbindDevice(bindData.deviceId, bindData.accountId);
            retDataDto = new RetDataDto(true, "");
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result updateDevice() {
        RetDataDto retDataDto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceMasterData deviceMasterData = objectMapper.treeToValue(request().body().asJson(), DeviceMasterData.class);
            deviceMasterData = deviceServiceAdapter.updateDevice(deviceMasterData);
            retDataDto = new RetDataDto(true, "", deviceMasterData);
        } catch (Exception e) {
            retDataDto = new RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result shareDevice() {
        models.dto.RetDataDto retDataDto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceShareData shareData = objectMapper.treeToValue(request().body().asJson(), DeviceShareData.class);
            DeviceMasterData device = deviceServiceAdapter.shareDevice(shareData);
            retDataDto = new models.dto.RetDataDto(true, "", device);
        } catch (Exception e) {
            retDataDto = new models.dto.RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }

    public Result unshareDevice() {
        models.dto.RetDataDto retDataDto = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            DeviceShareData shareData = objectMapper.treeToValue(request().body().asJson(), DeviceShareData.class);
            DeviceMasterData device = deviceServiceAdapter.unshareDevice(shareData);
            retDataDto = new models.dto.RetDataDto(true, "", device);
        } catch (Exception e) {
            retDataDto = new models.dto.RetDataDto(false, e.getMessage());
        } finally {
            return ok(Json.toJson(retDataDto));
        }
    }
}
