package com.czy0729.bangumi;

import android.os.Build;
import android.os.Bundle;
import android.content.Intent;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import expo.modules.ReactActivityDelegateWrapper;

import com.umeng.analytics.MobclickAgent;
import com.umeng.commonsdk.UMConfigure;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    setTheme(R.style.AppTheme);
    super.onCreate(null);

    UMConfigure.setProcessEvent(true);
    UMConfigure.init(this, "5ddceaa10cafb2ea9900066a", "Umeng", UMConfigure.DEVICE_TYPE_PHONE, null);
    MobclickAgent.setSessionContinueMillis(45000);
    MobclickAgent.setPageCollectionMode(MobclickAgent.PageMode.LEGACY_MANUAL);

    // 处理分享文本（冷启动情况）
    handleSendText(getIntent());
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
    // 处理分享文本（热启动情况）
    handleSendText(intent);
  }

  private void handleSendText(Intent intent) {
    if (intent == null) return;

    String sharedText = null;

    // 处理 PROCESS_TEXT 动作
    if (Intent.ACTION_PROCESS_TEXT.equals(intent.getAction())) {
      sharedText = intent.getStringExtra(Intent.EXTRA_PROCESS_TEXT);
    }
    // 处理 SEND 动作
    else if (Intent.ACTION_SEND.equals(intent.getAction())
      && "text/plain".equals(intent.getType())) {
      sharedText = intent.getStringExtra(Intent.EXTRA_TEXT);
    }

    if (sharedText != null) {
      TextShareModule.sendShareEvent(sharedText);
    }
  }

  @Override
  protected String getMainComponentName() {
    return "main";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
      new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        DefaultNewArchitectureEntryPoint.getFabricEnabled()
      )
    );
  }

  @Override
  public void invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        super.invokeDefaultOnBackPressed();
      }
      return;
    }
    super.invokeDefaultOnBackPressed();
  }

  public void onResume() {
    super.onResume();
    MobclickAgent.onResume(this);
  }

  public void onPause() {
    super.onPause();
    MobclickAgent.onPause(this);
  }
}
