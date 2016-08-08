import models.dto.account.AccountData;
import models.dto.account.AccountGroupData;
import models.dto.device.DeviceMasterData;
import models.service.account.AccountServiceAdapter;
import models.service.account.AccountServiceAdapterImpl;
import models.service.app.AppServiceAdapter;
import models.service.app.AppServiceAdapterImpl;
import models.service.device.DeviceServiceAdapter;
import models.service.device.DeviceServiceAdapterImpl;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import play.libs.F.Callback;
import play.libs.Json;
import play.test.TestBrowser;

import static org.fest.assertions.Assertions.assertThat;
import static play.test.Helpers.*;

public class IntegrationTest {
    private ApplicationContext context = new ClassPathXmlApplicationContext("spring-context/application-context.xml");
    private Long accountId = 12321321323l;
    private String timestamp = String.valueOf((System.currentTimeMillis()+"").toCharArray(),5,8);
    /**
     * add your integration test here
     * in this example we just check if the welcome page is being shown
     */
//    @Test
    public void test() {
        running(testServer(3333, fakeApplication(inMemoryDatabase())), HTMLUNIT, new Callback<TestBrowser>() {
            public void invoke(TestBrowser browser) {
                browser.goTo("http://localhost:3333");
                assertThat(browser.pageSource()).contains("Your new application is ready.");
            }
        });
    }

//    @Test
    public void accountTest(){
        _("\n\n------------------------AccountTest---------------------");
        AccountServiceAdapter accountServiceAdapter = context.getBean(AccountServiceAdapterImpl.class);
        AccountData accountData = accountServiceAdapter.findAccountById(accountId);
        _(accountData);
//        _("\nTest find:");
//        _(accountServiceAdapter.findContacts(accountId));
//        _(accountServiceAdapter.findAccountByEmail(accountData.email));
//        _(accountServiceAdapter.findAccountByEmailLike(accountData.email.substring(3)));
//        _(accountServiceAdapter.findAccountByPhone(accountData.phoneNumber));
//        _(accountServiceAdapter.findAccountByNameLike(accountData.name));

//        _("\nTest create/update:");
//        accountData = new AccountData();
//        accountData.phoneNumber = timestamp;accountData.address=timestamp;accountData.company=timestamp;accountData.avatarUrl=timestamp;
//        accountData.accountId=timestamp;accountData.name = "testname"+timestamp; accountData.password=timestamp;accountData.email = "testeamil"+timestamp; accountData.type = AccountType.PERSONAL;
//        _(accountData = accountServiceAdapter.createAccount(accountData));
//        _(accountServiceAdapter.findAccountById(Long.valueOf(accountData.accountId)));
//        accountData.name = "newname"+timestamp;accountData.password="newpassword"+timestamp;
//        _(accountData = accountServiceAdapter.updateAccount(accountData));
//        _(accountServiceAdapter.findAccountById(Long.valueOf(accountData.accountId)));

//        _("\nTest AccountGroup create:");
//        AccountGroupData groupData = new AccountGroupData();
//        groupData.name = "sasasdasda";
//        groupData.owner = accountData;
//        _(groupData = accountServiceAdapter.createAccountGroup(groupData));

//        _("\nTest AccountGroup modify:");
//        groupData.name="newname"+timestamp;
//        _(groupData=accountServiceAdapter.modifyAccountGroup(accountId,groupData));

        _("\nTest AccountGroup join:");
        AccountGroupData groupData = accountServiceAdapter.findGroup(145l);
        _(groupData);
        _(groupData=accountServiceAdapter.joinAccountGroup(9091298231l,145l));

        _("\nTest AccountGroup quit:");
        _(groupData=accountServiceAdapter.quitAccountGroup(9091298231l,145l)); //todo ACCOUNT DOES NOT HAVE THE GROUP

//        _("\nTest AccountGroup kick:");
//        AccountGroupKickData kickData = new AccountGroupKickData();
//        kickData.groupId = String.valueOf(145l);
//        kickData.accountId = String.valueOf(9091298231l);
//        _(groupData=accountServiceAdapter.kickAccountGroup(accountId,kickData)); //todo ACCOUNT DOES NOT HAVE THE GROUP

//        _("\nTest AccountGroup delete:");
//        _(groupData = accountServiceAdapter.deleteAccountGroup(accountId, 145l)); //todo ACCOUNT DOES NOT HAVE THE GROUP

    }

//    @Test
    public void deviceTest(){
        _("\n\n------------------------DeviceTest---------------------");
        DeviceServiceAdapter deviceServiceAdapter = context.getBean(DeviceServiceAdapterImpl.class);
        AccountServiceAdapter accountServiceAdapter = context.getBean(AccountServiceAdapterImpl.class);
        accountId = 764111382711898568l;
        long deviceId = 6827881482365236091l;
        DeviceMasterData deviceMasterData = deviceServiceAdapter.findDevice(deviceId);
        _(deviceMasterData);

//        _("\nTest Device bind/unbind:");
//        _(deviceMasterData = deviceServiceAdapter.bindDevice(deviceId,accountId));
//        _(deviceMasterData = deviceServiceAdapter.unbindDevice(deviceId,accountId));

//        _("\nTest Device update:");
//        deviceMasterData.name = "公司控制中心Test";
//        _(deviceMasterData = deviceServiceAdapter.updateDevice(deviceMasterData));

//        _("\nTest Device share/unshare:");
//        DeviceShareData shareData = new DeviceShareData();
//        shareData.deviceId = String.valueOf(deviceId);
//        shareData.groupId = String.valueOf(145l);
//        shareData.types = new HashSet<PermissionType>(){{add(PermissionType.READABLE);}};
//        deviceServiceAdapter.shareDevice(shareData);
//        _(deviceServiceAdapter.findDevice(deviceId));
//        deviceServiceAdapter.unshareDevice(shareData);
//        _(deviceServiceAdapter.findDevice(deviceId));

    }

//    @Test
    public void appTest(){
        _("\n\n------------------------AppTest---------------------");
        AppServiceAdapter appServiceAdapter = context.getBean(AppServiceAdapterImpl.class);
        AccountServiceAdapter accountServiceAdapter = context.getBean(AccountServiceAdapterImpl.class);


    }


    public void _(Object object){
        if(object instanceof String){
            System.out.println((String)object);
        }else {
            System.out.println(Json.toJson(object).toString());
        }
    }

}
