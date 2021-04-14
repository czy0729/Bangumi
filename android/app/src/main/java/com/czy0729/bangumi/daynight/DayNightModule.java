package com.czy0729.bangumi.daynight;

import android.app.Activity;
import android.view.WindowManager;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import androidx.appcompat.app.AppCompatDelegate;
import androidx.appcompat.app.AppCompatActivity;

/**
 * A module to change how the android keyboard is displayed
 */
public class DayNightModule extends ReactContextBaseJavaModule {

    public DayNightModule(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
    }

    @Override
    public String getName() {
        return "DayNight";
    }

    @ReactMethod
    public void setDarkMode(int mode) {
        AppCompatDelegate.setDefaultNightMode(mode);
        AppCompatActivity activity = (AppCompatActivity)getCurrentActivity();
        activity.getDelegate().applyDayNight();
    }
}
