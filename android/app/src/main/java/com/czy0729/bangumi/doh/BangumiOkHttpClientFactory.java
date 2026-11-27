package com.czy0729.bangumi.doh;

import android.content.Context;
import android.os.SystemClock;
import android.util.Log;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.ProxySelector;
import java.net.Socket;
import java.net.SocketAddress;
import java.net.URI;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import okhttp3.Cache;
import okhttp3.ConnectionPool;
import okhttp3.Dispatcher;
import okhttp3.OkHttpClient;

/**
 * Custom OkHttpClientFactory that injects DoH DNS and ECH proxy for Bangumi domains.
 *
 * Because FastImage/Glide derives its OkHttpClient from
 * OkHttpClientProvider.getOkHttpClient(), this single injection
 * covers both NetworkingModule (fetch/XHR) and image loading (Glide).
 *
 * Uses a dynamic Proxy that checks EchProxyModule.getProxyPort() on each connection,
 * so it automatically picks up the proxy when EchProxy starts.
 *
 * Register in MainApplication.onCreate():
 * OkHttpClientProvider.setOkHttpClientFactory(new BangumiOkHttpClientFactory(context));
 */
public class BangumiOkHttpClientFactory implements OkHttpClientFactory {

    private static final String TAG = "BangumiOkHttpFactory";

    /** HTTP 磁盘缓存大小: 100 MB */
    private static final long HTTP_CACHE_SIZE = 100 * 1024 * 1024;

    /** 持久化文件目录 (冷启动不丢失) */
    private final File filesDir;

    /** 不跟随跳转的 client, 供 x-no-redirect 请求使用 */
    private volatile OkHttpClient noRedirectClient;

    /** 收集本次请求链路上所有 Set-Cookie (含重定向各跳), 供 x-set-cookie 返回给 JS */
    private static final ThreadLocal<List<String>> COOKIE_CAPTURE = new ThreadLocal<>();

    /** Target domains for ECH proxy (must stay in sync with src/config.ts ECH_TARGET_DOMAINS) */
    private static final String[] TARGETS = {
        "bgm.tv", "chii.in", "lain.bgm.tv",
        "next.bgm.tv", "api.bgm.tv", "cloudflare-dns.com"
    };

    private static boolean isTarget(String host) {
        if (host == null) return false;
        for (String target : TARGETS) {
            if (host.equals(target) || host.endsWith("." + target)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Permissive TrustManager for ECH proxy MITM.
     * Only used when ECH proxy is actively running and connecting to target domains.
     */
    private static final X509TrustManager PERMISSIVE_TRUST_MANAGER = new X509TrustManager() {
        @Override
        public void checkClientTrusted(X509Certificate[] chain, String authType) {}
        @Override
        public void checkServerTrusted(X509Certificate[] chain, String authType) {}
        @Override
        public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
    };

    /** Permissive SSLSocketFactory for ECH proxy MITM */
    private static final SSLSocketFactory PERMISSIVE_SSL_FACTORY;
    static {
        try {
            SSLContext ctx = SSLContext.getInstance("TLS");
            ctx.init(null, new TrustManager[]{PERMISSIVE_TRUST_MANAGER}, new SecureRandom());
            PERMISSIVE_SSL_FACTORY = ctx.getSocketFactory();
        } catch (Exception e) {
            throw new RuntimeException("Failed to init permissive SSLContext", e);
        }
    }

    /** System default SSLSocketFactory */
    private static final SSLSocketFactory SYSTEM_SSL_FACTORY;
    static {
        try {
            SSLContext ctx = SSLContext.getInstance("TLS");
            ctx.init(null, null, null);
            SYSTEM_SSL_FACTORY = ctx.getSocketFactory();
        } catch (Exception e) {
            throw new RuntimeException("Failed to init system SSLContext", e);
        }
    }

    /** * 安全获取系统默认 ProxySelector。
     * 增加防御性判断，防止因 Factory 重复初始化或外部包装导致拿到的默认 Selector 是自身，引发死循环闪退。
     */
    private static ProxySelector getSafeSystemDefault() {
        try {
            ProxySelector selector = ProxySelector.getDefault();
            if (selector != null && selector.getClass().getName().contains("BangumiOkHttpClientFactory")) {
                return null;
            }
            return selector;
        } catch (Exception ignored) {
            return null;
        }
    }

    public BangumiOkHttpClientFactory(Context context) {
        this.filesDir = context.getFilesDir();
    }

    @Override
    public OkHttpClient createNewNetworkModuleClient() {
        File httpCacheDir = new File(filesDir, "http-cache");

        // Use a selector that dynamically checks proxy port
        // This way, when EchProxy starts, new connections automatically go through it
        // 显式化并发与连接复用参数 (默认 maxRequestsPerHost=5 / 连接池 5 idle 5 分钟)
        // 注意: Dispatcher 的上限只作用于异步 enqueue (JS fetch/XHR 批量接口), Glide 图片走同步
        // execute() 不受此限, 因此这里主要让接口请求更快拿到图片地址, 而非直接提升图片并发
        Dispatcher dispatcher = new Dispatcher();
        dispatcher.setMaxRequests(64);
        dispatcher.setMaxRequestsPerHost(10);

        okhttp3.OkHttpClient.Builder builder = new OkHttpClient.Builder()
                .dispatcher(dispatcher)
                .connectionPool(new ConnectionPool(6, 5, TimeUnit.MINUTES))
                // readTimeout 保持 15s 不变: 排队时长靠代理侧优化收敛, 不放宽失败判定
                .connectTimeout(10, TimeUnit.SECONDS)
                .readTimeout(15, TimeUnit.SECONDS)
                .writeTimeout(20, TimeUnit.SECONDS)
                .cookieJar(new com.facebook.react.modules.network.ReactCookieJarContainer())
                .dns(DoHDNS.getInstance())
                .proxySelector(new ProxySelector() {
                    /** 保存初始化此时的系统默认 ProxySelector，用于无缝回退 */
                    private final ProxySelector systemDefault = getSafeSystemDefault();

                    @Override
                    public List<Proxy> select(URI uri) {
                        String host = uri.getHost();
                        int port = EchProxyModule.getProxyPort();

                        // 当 ECH 穿透开启，且是目标域名时，强制走本地 ECH 代理隧道
                        if (port > 0 && isTarget(host)) {
                            return Collections.singletonList(
                                new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", port))
                            );
                        }

                        // 【核心修复】：ECH 未运行或非目标域名时，将控制权还给系统代理（保留用户手机 Wi-Fi 挂的 HTTP 代理）
                        if (systemDefault != null) {
                            return systemDefault.select(uri);
                        }

                        // 若既没有开启 ECH，系统也没有任何代理配置，则彻底直连
                        return Collections.singletonList(Proxy.NO_PROXY);
                    }

                    @Override
                    public void connectFailed(URI uri, SocketAddress sa, IOException ioe) {
                        Log.w(TAG, "Proxy connect failed for " + uri + ": " + ioe.getMessage());
                        String host = uri.getHost();
                        if (isTarget(host)) {
                            EchProxyModule.addLog("error", "connect", host + " 连接失败: " + ioe.getMessage());
                        }
                        // 同时将连接失败通知给系统默认的 Selector，保证其内部重试/健康度监测逻辑不中断
                        if (systemDefault != null) {
                            systemDefault.connectFailed(uri, sa, ioe);
                        }
                    }
                })
                .addInterceptor(chain -> {
                    okhttp3.Request request = chain.request();
                    String host = request.url().host();
                    int port = EchProxyModule.getProxyPort();
                    if (port > 0 && isTarget(host)) {
                        String fullPath = request.url().encodedPath();
                        String query = request.url().encodedQuery();
                        String fullUrl = fullPath + (query != null ? "?" + query : "");
                        // info 日志按 host+path 节流 (不含 query): 图片 URL 的 query 常唯一,
                        // 带 query 会让节流失效并把节流表迅速撑到上限 (error 不节流)
                        if (shouldLog(host + fullPath)) {
                            String ip = getCachedIp(host);
                            Log.d(TAG, host + fullUrl + " -> proxy -> " + ip);
                            EchProxyModule.addLog("info", "connect", host + fullUrl + " -> " + ip);
                        }
                    }
                    try {
                        return chain.proceed(request);
                    } catch (Exception e) {
                        if (port > 0 && isTarget(host)) {
                            EchProxyModule.addLog("error", "connect", host + " 请求失败: " + e.getMessage());
                        }
                        throw e;
                    }
                })
                .addNetworkInterceptor(chain -> {
                    okhttp3.Response response = chain.proceed(chain.request());
                    List<String> sink = COOKIE_CAPTURE.get();
                    List<String> cookies = response.headers("Set-Cookie");
                    if (sink != null && !cookies.isEmpty()) sink.addAll(cookies);

                    return response;
                })
                .addInterceptor(chain -> {
                    okhttp3.Request request = chain.request();
                    String flag = request.header("x-no-redirect");

                    // 嵌套调用 (native 分支内部再发一次) 复用外层的收集列表
                    List<String> collected = COOKIE_CAPTURE.get();
                    boolean owner = collected == null;
                    if (owner) {
                        collected = new ArrayList<>();
                        COOKIE_CAPTURE.set(collected);
                    }

                    try {
                        // 只接管 'native'; 'true' 需要原样留给 Worker 节点处理
                        if (!"native".equalsIgnoreCase(flag)) {
                            return chain.proceed(request);
                        }

                        OkHttpClient noRedirectClient = this.noRedirectClient;
                        okhttp3.Request plain = request.newBuilder().removeHeader("x-no-redirect").build();
                        if (noRedirectClient == null) {
                            return chain.proceed(plain);
                        }

                        okhttp3.Response response = noRedirectClient.newCall(plain).execute();
                        if (!response.isRedirect()) {
                            return withSetCookie(response, collected);
                        }

                        // 与节点 x-no-redirect 一致的返回形态: 200 + Location + Set-Cookie
                        String location = response.header("Location");
                        okhttp3.ResponseBody body = okhttp3.ResponseBody.create(
                                okhttp3.MediaType.parse("application/json; charset=utf-8"),
                                "{\"location\":\"" + (location == null ? "" : location.replace("\"", "\\\"")) + "\"}"
                        );
                        if (response.body() != null) {
                            response.body().close();
                        }

                        okhttp3.Response converted = response.newBuilder()
                                .code(200)
                                .message("OK")
                                .removeHeader("Content-Length")
                                .removeHeader("Content-Encoding")
                                .removeHeader("Transfer-Encoding")
                                .header("Content-Type", "application/json; charset=utf-8")
                                .body(body)
                                .build();

                        return withSetCookie(converted, collected);
                    } finally {
                        if (owner) COOKIE_CAPTURE.remove();
                    }
                })
                .cache(new Cache(httpCacheDir, HTTP_CACHE_SIZE));

        // Dynamic SSL: only use permissive when ECH proxy is active and connecting to target domains
        // This ensures non-target domains and requests when ECH is disabled use standard verification
        builder.sslSocketFactory(new DynamicSSLSocketFactory(), PERMISSIVE_TRUST_MANAGER);
        builder.hostnameVerifier((hostname, session) -> {
            // If ECH proxy is not running, use default verification
            int port = EchProxyModule.getProxyPort();
            if (port <= 0) {
                return hostname.equals(session.getPeerHost());
            }
            // If ECH proxy is running and this is a target domain, allow it
            if (isTarget(hostname)) {
                return true;
            }
            // For non-target domains, use default verification
            return hostname.equals(session.getPeerHost());
        });

        OkHttpClient client = builder.build();
        noRedirectClient = client.newBuilder()
                .followRedirects(false)
                .followSslRedirects(false)
                .cookieJar(okhttp3.CookieJar.NO_COOKIES)
                .build();
        return client;
    }

    /**
     * Dynamic SSLSocketFactory that delegates to permissive or system factory
     * based on whether ECH proxy is active.
     *
     * When ECH is enabled: uses permissive SSL for MITM proxy support
     * When ECH is disabled: uses system default SSL for standard security
     */
    private static class DynamicSSLSocketFactory extends SSLSocketFactory {
        private SSLSocketFactory getDelegate() {
            int port = EchProxyModule.getProxyPort();
            if (port > 0) {
                return PERMISSIVE_SSL_FACTORY;
            }
            return SYSTEM_SSL_FACTORY;
        }

        @Override
        public String[] getDefaultCipherSuites() {
            return getDelegate().getDefaultCipherSuites();
        }

        @Override
        public String[] getSupportedCipherSuites() {
            return getDelegate().getSupportedCipherSuites();
        }

        @Override
        public Socket createSocket(Socket s, String host, int port, boolean autoClose) throws IOException {
            return getDelegate().createSocket(s, host, port, autoClose);
        }

        @Override
        public Socket createSocket(String host, int port) throws IOException {
            return getDelegate().createSocket(host, port);
        }

        @Override
        public Socket createSocket(String host, int port, InetAddress localHost, int localPort) throws IOException {
            return getDelegate().createSocket(host, port, localHost, localPort);
        }

        @Override
        public Socket createSocket(InetAddress host, int port) throws IOException {
            return getDelegate().createSocket(host, port);
        }

        @Override
        public Socket createSocket(InetAddress address, int port, InetAddress localAddress, int localPort) throws IOException {
            return getDelegate().createSocket(address, port, localAddress, localPort);
        }
    }

    /**
     * 把多条 Set-Cookie 合并成 x-set-cookie
     * - RN 部分链路不会把 Set-Cookie 透传给 JS, 节点也是用同样的合并头规避
     * - 已有 x-set-cookie (Worker 节点返回) 时保持原样
     */
    private static okhttp3.Response withSetCookie(okhttp3.Response response, List<String> collected) {
        if (response.header("x-set-cookie") != null) return response;

        List<String> cookies =
                collected != null && !collected.isEmpty() ? collected : response.headers("Set-Cookie");
        if (cookies.isEmpty()) return response;

        StringBuilder merged = new StringBuilder();
        for (String cookie : cookies) {
            if (merged.length() > 0) merged.append(", ");
            merged.append(cookie);
        }

        return response.newBuilder().header("x-set-cookie", merged.toString()).build();
    }

    /** target_ips.txt 的 IP 内存缓存: host -> ip, 避免每个请求都同步读磁盘 */
    private static final long IP_CACHE_TTL_MS = 60 * 1000;

    private static class IpCacheEntry {
        final String ip;
        final long createdAt;

        IpCacheEntry(String ip) {
            this.ip = ip;
            this.createdAt = SystemClock.elapsedRealtime();
        }

        boolean isExpired() {
            return SystemClock.elapsedRealtime() - createdAt > IP_CACHE_TTL_MS;
        }
    }

    private static final ConcurrentHashMap<String, IpCacheEntry> IP_CACHE = new ConcurrentHashMap<>();

    /** 获取 host 当前缓存 IP (内存优先, 60s TTL) */
    private static String getCachedIp(String hostname) {
        IpCacheEntry cached = IP_CACHE.get(hostname);
        if (cached != null && !cached.isExpired()) {
            return cached.ip;
        }

        String ip = readCachedIpFromDisk(hostname);
        IP_CACHE.put(hostname, new IpCacheEntry(ip));
        return ip;
    }

    /** 从 EchProxy 的 target_ips.txt 读取 IP (仅在内存缓存未命中时调用) */
    private static String readCachedIpFromDisk(String hostname) {
        try {
            // Try to get cache dir from DoHDNS instance (which has EchProxy cache)
            File echCacheDir = DoHDNS.getInstance().getEchProxyCacheDir();
            if (echCacheDir == null) return "unknown";

            File cacheFile = new File(echCacheDir, "target_ips.txt");
            if (!cacheFile.exists()) return "unknown";

            try (BufferedReader reader = new BufferedReader(new FileReader(cacheFile))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    line = line.trim();
                    if (line.isEmpty() || line.startsWith("#")) continue;

                    String[] parts = line.split("\\|", 2);
                    if (parts.length == 2 && parts[0].equals(hostname)) {
                        return parts[1].split(",")[0].trim();
                    }
                }
            }
        } catch (Exception ignored) {
        }
        return "unknown";
    }

    /** info 日志节流: key -> 上次记录时间 */
    private static final long LOG_THROTTLE_MS = 1000;
    private static final int LOG_THROTTLE_MAX_KEYS = 256;
    private static final ConcurrentHashMap<String, Long> LOG_THROTTLE = new ConcurrentHashMap<>();

    /** 同一 key 1s 内只允许记录一条 info 日志 */
    private static boolean shouldLog(String key) {
        long now = SystemClock.elapsedRealtime();
        Long last = LOG_THROTTLE.get(key);
        if (last != null && now - last < LOG_THROTTLE_MS) {
            return false;
        }
        if (LOG_THROTTLE.size() >= LOG_THROTTLE_MAX_KEYS) {
            LOG_THROTTLE.clear();
        }
        LOG_THROTTLE.put(key, now);
        return true;
    }
}
