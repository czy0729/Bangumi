package com.czy0729.bangumi;

import android.view.Display;
import android.view.Window;
import android.view.WindowManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class HighRefreshRateModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public HighRefreshRateModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "HighRefreshRateModule";
    }

    // 判断设备是否支持高刷新率
    @ReactMethod
    public void isHighRefreshRateSupported(Promise promise) {
        try {
            Window window = getCurrentActivity().getWindow();
            Display display = window.getWindowManager().getDefaultDisplay();
            float refreshRate = display.getRefreshRate();

            // 假设 60Hz 以上为高刷新率
            boolean isSupported = refreshRate > 60;
            promise.resolve(isSupported);
        } catch (Exception e) {
            promise.reject("ERROR", "Failed to check high refresh rate support", e);
        }
    }

    // 启用高刷新率
    @ReactMethod
    public void enableHighRefreshRate(Promise promise) {
        try {
            Window window = getCurrentActivity().getWindow();
            WindowManager.LayoutParams params = window.getAttributes();

            // 获取支持的显示模式
            Display display = window.getWindowManager().getDefaultDisplay();
            Display.Mode[] modes = display.getSupportedModes();

            // 查找最高刷新率的模式
            Display.Mode maxRefreshRateMode = null;
            for (Display.Mode mode : modes) {
                if (maxRefreshRateMode == null || mode.getRefreshRate() > maxRefreshRateMode.getRefreshRate()) {
                    maxRefreshRateMode = mode;
                }
            }

            if (maxRefreshRateMode != null) {
                // 设置最高刷新率模式
                params.preferredDisplayModeId = maxRefreshRateMode.getModeId();
                window.setAttributes(params);
                promise.resolve(true);
            } else {
                promise.reject("ERROR", "No supported high refresh rate mode found");
            }
        } catch (Exception e) {
            promise.reject("ERROR", "Failed to enable high refresh rate", e);
        }
    }
}
