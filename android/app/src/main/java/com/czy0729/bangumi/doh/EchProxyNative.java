package com.czy0729.bangumi.doh;

public class EchProxyNative {
    static {
        System.loadLibrary("echproxy");
    }

    public static native int startProxy(int port, String dns, String caDir, String cacheDir);
    public static native void stopProxy();
    public static native String getCaPem();
}
