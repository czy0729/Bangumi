package com.czy0729.bangumi;

// import com.umeng.analytics.MobclickAgent;
// import com.umeng.commonsdk.UMConfigure;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;
import expo.modules.splashscreen.SplashScreen;
import expo.modules.splashscreen.SplashScreenImageResizeMode;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // SplashScreen.show(...) has to be called after super.onCreate(...)
    // Below line is handled by '@expo/configure-splash-screen' command and it's discouraged to modify it manually
    SplashScreen.show(this, SplashScreenImageResizeMode.CONTAIN, false);

    // 注意：如果您已经在AndroidManifest.xml中配置过appkey和channel值，可以调用此版本初始化函数。
    // UMConfigure.setLogEnabled(true);
    // UMConfigure.setProcessEvent(true);
    // UMConfigure.init(this, "5ddceaa10cafb2ea9900066a", "Umeng", UMConfigure.DEVICE_TYPE_PHONE, null); // Umeng | Google Play

    // interval: 单位是毫秒，默认Session间隔时间是45秒
    // MobclickAgent.setDebugMode(true);
    // MobclickAgent.setSessionContinueMillis(45000);
    // MobclickAgent.setPageCollectionMode(MobclickAgent.PageMode.LEGACY_MANUAL);
  }


    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "main";
        // return "czy0729.bangumi";
    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new ReactActivityDelegate(this, getMainComponentName()) {
            @Override
            protected ReactRootView createRootView() {
                return new RNGestureHandlerEnabledRootView(MainActivity.this);
            }
        };
    }

    public void onResume() {
      super.onResume();
      // MobclickAgent.onResume(this);
    }

    public void onPause() {
      super.onPause();
      // MobclickAgent.onPause(this);
    }
}
