package com.czy0729.bangumi.devmenu;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.UiThreadUtil;

/**
 * 调起系统开发者菜单 (免摇晃设备)
 */
public class DevMenuModule extends ReactContextBaseJavaModule {

    public DevMenuModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Override
    public String getName() {
        return "DevMenu";
    }

    @ReactMethod
    public void show() {
        UiThreadUtil.runOnUiThread(
            new Runnable() {
                @Override
                public void run() {
                    ReactInstanceManager reactInstanceManager =
                        ((ReactApplication) getReactApplicationContext().getApplicationContext())
                            .getReactNativeHost()
                            .getReactInstanceManager();
                    if (reactInstanceManager != null) {
                        reactInstanceManager.getDevSupportManager().showDevOptionsDialog();
                    }
                }
            });
    }
}
