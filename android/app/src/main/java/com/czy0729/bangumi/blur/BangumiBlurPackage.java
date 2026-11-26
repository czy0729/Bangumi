package com.czy0729.bangumi.blur;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * 自研模糊模块: 替代 react-native-realtimeblurview 与 Android 端的 expo-blur
 *
 * 设计要点见 BangumiBlurRootView: 一份共享抓取 + 多实例采样, 抓取次数与实例数无关
 */
public class BangumiBlurPackage implements ReactPackage {

  @NonNull
  @Override
  public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
    return new ArrayList<>();
  }

  @NonNull
  @Override
  public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(
        new BangumiBlurRootViewManager(),
        new BangumiBlurViewManager());
  }
}
