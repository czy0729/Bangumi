package com.czy0729.bangumi;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import android.app.Activity;
import android.content.Intent;

public class TextShareModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  public TextShareModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @NonNull
  @Override
  public String getName() {
    return "TextShareModule";
  }

  @ReactMethod
  public void getSharedText(Promise promise) {
    try {
      Activity currentActivity = getCurrentActivity();
      if (currentActivity != null) {
        Intent intent = currentActivity.getIntent();

        // 检查 PROCESS_TEXT
        if (Intent.ACTION_PROCESS_TEXT.equals(intent.getAction())) {
          String text = intent.getStringExtra(Intent.EXTRA_PROCESS_TEXT);
          if (text != null) {
            promise.resolve(text);
            return;
          }
        }

        // 检查 SEND
        if (Intent.ACTION_SEND.equals(intent.getAction())
          && "text/plain".equals(intent.getType())) {
          String text = intent.getStringExtra(Intent.EXTRA_TEXT);
          promise.resolve(text);
          return;
        }
      }
      promise.resolve(null);
    } catch (Exception e) {
      promise.reject("ERROR_GETTING_TEXT", e);
    }
  }

  public static void sendShareEvent(String text) {
    if (reactContext != null && text != null) {
      WritableMap params = Arguments.createMap();
      params.putString("text", text);
      reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit("onTextShared", params);
    }
  }
}
