package com.czy0729.bangumi.doh;

import androidx.annotation.NonNull;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

import android.util.Log;

/**
 * ECH 代理 Native Module
 *
 * 通过本地 HTTPS CONNECT 代理 (ECH + DoH) 绕过 SNI 封锁访问 bgm.tv
 * JS 桥接: src/utils/proxy/ech/native.ts
 *
 * OkHttp 接管仅通过 BangumiOkHttpClientFactory 的 ProxySelector 白名单实现,
 * 不再使用 NetworkingModule.setCustomClientBuilder 全局固定 proxy。
 */
public class EchProxyModule extends ReactContextBaseJavaModule {

    private static final String NAME = "EchProxyModule";
    private static final int MAX_LOGS = 50;
    private static final SimpleDateFormat TIME_FORMAT = new SimpleDateFormat("HH:mm:ss", Locale.getDefault());

    private static volatile int sProxyPort = 0;
    private int currentPort = 0;
    private boolean running = false;

    /** 日志收集 */
    private static final List<LogEntry> sLogs = new ArrayList<>();
    private static final Object sLogsLock = new Object();

    private static class LogEntry {
        final long time;
        final String level;
        final String message;

        LogEntry(String level, String message) {
            this.time = System.currentTimeMillis();
            this.level = level;
            this.message = message;
        }
    }

    /** 添加日志 */
    public static void addLog(String level, String message) {
        synchronized (sLogsLock) {
            if (sLogs.size() >= MAX_LOGS) {
                sLogs.remove(0);
            }
            sLogs.add(new LogEntry(level, message));
        }
    }

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
        if (!EchProxyNative.isAvailable) {
            promise.reject("ECH_NATIVE_UNAVAILABLE", "Native library libechproxy.so not available");
            return;
        }

        // 以 static sProxyPort 为准, 防止 ReactContext 重建后重复启动
        if (sProxyPort > 0) {
            currentPort = sProxyPort;
            running = true;
            addLog("info", "代理已在运行，端口: " + sProxyPort);
            promise.resolve(sProxyPort);
            return;
        }

        int port = config.hasKey("port") ? config.getInt("port") : 0;
        String dns = config.hasKey("dns") ? config.getString("dns") : "https://cloudflare-dns.com/dns-query";

        try {
            String caDir = getCaDir();
            String cacheDir = getCacheDir();
            Log.d("EchProxy", "Starting proxy with port=" + port + ", dns=" + dns + ", caDir=" + caDir + ", cacheDir=" + cacheDir);
            addLog("info", "启动代理中...");
            currentPort = EchProxyNative.safeStartProxy(port, dns, caDir, cacheDir);

            if (currentPort <= 0) {
                Log.e("EchProxy", "Proxy failed to start: returned port " + currentPort);
                addLog("error", "启动失败，端口返回 0");
                promise.reject("ECH_START_FAILED", "Proxy failed to start (port=" + currentPort + ")");
                return;
            }

            running = true;
            sProxyPort = currentPort;
            Log.d("EchProxy", "Proxy started: port=" + currentPort);
            addLog("success", "代理已启动，端口: " + currentPort);

            // Share EchProxy cache with DoHDNS for image DNS resolution
            DoHDNS.getInstance().setEchProxy(cacheDir);
            Log.d("EchProxy", "Shared EchProxy cache with DoHDNS: " + cacheDir);
            addLog("info", "缓存已共享至 DoHDNS");

            promise.resolve(currentPort);
        } catch (Exception e) {
            Log.e("EchProxy", "Failed to start proxy", e);
            addLog("error", "启动异常: " + e.getMessage());
            // Reset state on failure
            currentPort = 0;
            sProxyPort = 0;
            running = false;
            promise.reject("ECH_START_FAILED", e.getMessage(), e);
        }
    }

    @ReactMethod
    public void disable(Promise promise) {
        try {
            // 不依赖实例 running 字段, 总是尝试停止 native server
            addLog("info", "停止代理中...");
            EchProxyNative.safeStopProxy();
            currentPort = 0;
            sProxyPort = 0;
            running = false;
            addLog("success", "代理已停止");
            promise.resolve(null);
        } catch (Exception e) {
            addLog("error", "停止失败: " + e.getMessage());
            promise.reject("ECH_STOP_FAILED", e.getMessage(), e);
        }
    }

    @ReactMethod
    public void getStatus(Promise promise) {
        // 以 static sProxyPort 为准, 跨 ReactContext 实例一致
        WritableMap status = Arguments.createMap();
        status.putBoolean("running", sProxyPort > 0);
        status.putInt("port", sProxyPort);
        promise.resolve(status);
    }

    @ReactMethod
    public void getLogs(Promise promise) {
        WritableArray logs = Arguments.createArray();
        synchronized (sLogsLock) {
            for (LogEntry entry : sLogs) {
                WritableMap log = Arguments.createMap();
                log.putDouble("time", entry.time);
                log.putString("level", entry.level);
                log.putString("message", entry.message);
                logs.pushMap(log);
            }
        }
        promise.resolve(logs);
    }

    /**
     * OkHttp 代理已通过 BangumiOkHttpClientFactory 的 ProxySelector 白名单实现,
     * 不再需要 NetworkingModule.setCustomClientBuilder 全局固定 proxy。
     * 保留方法签名兼容 JS 调用, 实际为空操作。
     */
    @ReactMethod
    public void setOkHttpProxy(int port, Promise promise) {
        Log.d("EchProxy", "setOkHttpProxy: no-op (ProxySelector handles routing)");
        promise.resolve(null);
    }

    /**
     * OkHttp 代理已通过 BangumiOkHttpClientFactory 的 ProxySelector 白名单实现,
     * 不再需要清除 NetworkingModule custom builder。
     * 保留方法签名兼容 JS 调用, 实际为空操作。
     */
    @ReactMethod
    public void clearOkHttpProxy(Promise promise) {
        Log.d("EchProxy", "clearOkHttpProxy: no-op (ProxySelector handles routing)");
        promise.resolve(null);
    }

    private String getCaDir() {
        return getReactApplicationContext().getFilesDir().getAbsolutePath();
    }

    private String getCacheDir() {
        return getReactApplicationContext().getCacheDir().getAbsolutePath();
    }

    /**
     * Get cache directory for use by other components (e.g., BangumiOkHttpClientFactory).
     * Returns null if context is not available.
     */
    public static File getCacheDirStatic(ReactApplicationContext context) {
        if (context == null) return null;
        return context.getCacheDir();
    }
}
