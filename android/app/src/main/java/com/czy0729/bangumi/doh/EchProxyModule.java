package com.czy0729.bangumi.doh;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.network.NetworkingModule;

import android.util.Log;

import java.net.InetSocketAddress;
import java.net.Proxy;
import java.util.concurrent.TimeUnit;

/**
 * ECH 代理 Native Module
 *
 * 通过本地 HTTPS CONNECT 代理 (ECH + DoH) 绕过 SNI 封锁访问 bgm.tv
 * JS 桥接: src/utils/proxy/ech/native.ts
 */
public class EchProxyModule extends ReactContextBaseJavaModule {

    private static final String NAME = "EchProxyModule";

    private static volatile int sProxyPort = 0;
    private int currentPort = 0;
    private boolean running = false;

    /**
     * Get current proxy port for use by other components (e.g., BangumiOkHttpClientFactory).
     */
    public static int getProxyPort() {
        return sProxyPort;
    }

    public EchProxyModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void enable(ReadableMap config, Promise promise) {
        if (running) {
            promise.resolve(currentPort);
            return;
        }

        int port = config.hasKey("port") ? config.getInt("port") : 0;
        String dns = config.hasKey("dns") ? config.getString("dns") : "https://cloudflare-dns.com/dns-query";

        try {
            String caDir = getCaDir();
            String cacheDir = getCacheDir();
            Log.d("EchProxy", "Starting proxy with port=" + port + ", dns=" + dns + ", caDir=" + caDir + ", cacheDir=" + cacheDir);
            currentPort = EchProxyNative.startProxy(port, dns, caDir, cacheDir);
            running = currentPort > 0;
            sProxyPort = currentPort;
            Log.d("EchProxy", "Proxy started: port=" + currentPort);

            // Share EchProxy cache with DoHDNS for image DNS resolution
            if (running) {
                DoHDNS.getInstance().setEchProxy(cacheDir);
                Log.d("EchProxy", "Shared EchProxy cache with DoHDNS: " + cacheDir);
            }

            promise.resolve(currentPort);
        } catch (Exception e) {
            Log.e("EchProxy", "Failed to start proxy", e);
            promise.reject("ECH_START_FAILED", e.getMessage(), e);
        }
    }

    @ReactMethod
    public void disable(Promise promise) {
        if (!running) {
            promise.resolve(null);
            return;
        }

        try {
            EchProxyNative.stopProxy();
            currentPort = 0;
            sProxyPort = 0;
            running = false;
            promise.resolve(null);
        } catch (Exception e) {
            promise.reject("ECH_STOP_FAILED", e.getMessage(), e);
        }
    }

    @ReactMethod
    public void getStatus(Promise promise) {
        WritableMap status = Arguments.createMap();
        status.putBoolean("running", running);
        status.putInt("port", currentPort);
        promise.resolve(status);
    }

    /**
     * 仅配置 NetworkingModule (fetch/XHR) 走代理
     * 图片 (FastImage/Glide) 暂不走代理
     */
    @ReactMethod
    public void setOkHttpProxy(int port, Promise promise) {
        try {
            Log.d("EchProxy", "setOkHttpProxy: port=" + port);

            final Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", port));

            // Reuse the shared SSL singletons from BangumiOkHttpClientFactory
            // to avoid two separate SSLContext instances racing inside BoringSSL
            NetworkingModule.setCustomClientBuilder(builder -> {
                builder.proxy(proxy);
                builder.sslSocketFactory(
                    BangumiOkHttpClientFactory.SHARED_SSL_FACTORY,
                    BangumiOkHttpClientFactory.SHARED_TRUST_MANAGER
                );
                builder.hostnameVerifier((hostname, session) -> true);
                builder.connectTimeout(15, TimeUnit.SECONDS);
                builder.readTimeout(30, TimeUnit.SECONDS);
            });

            Log.d("EchProxy", "OkHttp proxy configured (NetworkingModule only)");
            promise.resolve(null);
        } catch (Exception e) {
            Log.e("EchProxy", "setOkHttpProxy failed", e);
            promise.reject("ECH_PROXY_CONFIG_FAILED", e.getMessage(), e);
        }
    }

    @ReactMethod
    public void clearOkHttpProxy(Promise promise) {
        try {
            Log.d("EchProxy", "clearOkHttpProxy");
            NetworkingModule.setCustomClientBuilder(builder -> {});
            Log.d("EchProxy", "OkHttp proxy cleared");
            promise.resolve(null);
        } catch (Exception e) {
            Log.e("EchProxy", "clearOkHttpProxy failed", e);
            promise.reject("ECH_PROXY_CLEAR_FAILED", e.getMessage(), e);
        }
    }

    private String getCaDir() {
        return getReactApplicationContext().getFilesDir().getAbsolutePath();
    }

    private String getCacheDir() {
        return getReactApplicationContext().getCacheDir().getAbsolutePath();
    }
}
