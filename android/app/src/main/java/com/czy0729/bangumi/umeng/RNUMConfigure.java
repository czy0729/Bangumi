package com.czy0729.bangumi.umeng;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import android.annotation.TargetApi;
import android.content.Context;
import android.os.Build.VERSION_CODES;
import com.umeng.commonsdk.UMConfigure;

/**
 * Created by wangfei on 17/9/14.
 */

public class RNUMConfigure {
    public static void init(Context context, String appkey, String channel, int type, String secret){
        initRN("react-native","2.0");
        UMConfigure.init(context,appkey,channel,type,secret);
    }
    @TargetApi(VERSION_CODES.KITKAT)
    private static void initRN(String v, String t){
        Method method = null;
        try {
            Class<?> config = Class.forName("com.umeng.commonsdk.UMConfigure");
            method = config.getDeclaredMethod("setWraperType", String.class, String.class);
            method.setAccessible(true);
            method.invoke(null, v,t);
        } catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException | ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
