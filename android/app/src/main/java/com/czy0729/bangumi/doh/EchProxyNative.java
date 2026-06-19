package com.czy0729.bangumi.doh;

import android.util.Log;

public class EchProxyNative {

    private static final String TAG = "EchProxyNative";

    /** native library 是否加载成功 */
    public static boolean isAvailable = false;

    static {
        try {
            System.loadLibrary("echproxy");
            isAvailable = true;
            Log.d(TAG, "libechproxy.so loaded successfully");
        } catch (Throwable e) {
            Log.e(TAG, "Failed to load libechproxy.so", e);
            isAvailable = false;
        }
    }

    /** 安全调用 startProxy, native 不可用时返回 0 */
    public static int safeStartProxy(int port, String dns, String caDir, String cacheDir) {
        if (!isAvailable) {
            Log.e(TAG, "startProxy called but native library not available");
            return 0;
        }
        return startProxy(port, dns, caDir, cacheDir);
    }

    /** 安全调用 stopProxy */
    public static void safeStopProxy() {
        if (!isAvailable) {
            Log.e(TAG, "stopProxy called but native library not available");
            return;
        }
        stopProxy();
    }

    /** 安全调用 getCaPem */
    public static String safeGetCaPem() {
        if (!isAvailable) {
            Log.e(TAG, "getCaPem called but native library not available");
            return null;
        }
        return getCaPem();
    }

    public static native int startProxy(int port, String dns, String caDir, String cacheDir);
    public static native void stopProxy();
    public static native String getCaPem();
}
