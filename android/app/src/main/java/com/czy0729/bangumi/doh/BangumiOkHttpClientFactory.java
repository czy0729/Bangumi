package com.czy0729.bangumi.doh;

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
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocket;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;

import okhttp3.Cache;
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
 *   OkHttpClientProvider.setOkHttpClientFactory(new BangumiOkHttpClientFactory(context));
 */
public class BangumiOkHttpClientFactory implements OkHttpClientFactory {

    private static final String TAG = "BangumiOkHttpFactory";
    private final File cacheDir;

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

    public BangumiOkHttpClientFactory(File cacheDir) {
        this.cacheDir = cacheDir;
    }

    @Override
    public OkHttpClient createNewNetworkModuleClient() {
        int cacheSize = 10 * 1024 * 1024; // 10 MB
        File httpCacheDir = new File(cacheDir, "http-cache");

        // Use a selector that dynamically checks proxy port
        // This way, when EchProxy starts, new connections automatically go through it
        okhttp3.OkHttpClient.Builder builder = new OkHttpClient.Builder()
                .connectTimeout(15, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .cookieJar(new com.facebook.react.modules.network.ReactCookieJarContainer())
                .dns(DoHDNS.getInstance())
                .proxySelector(new ProxySelector() {
                    @Override
                    public List<Proxy> select(URI uri) {
                        String host = uri.getHost();
                        int port = EchProxyModule.getProxyPort();
                        if (port > 0 && isTarget(host)) {
                            return Collections.singletonList(
                                new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", port))
                            );
                        }
                        return Collections.singletonList(Proxy.NO_PROXY);
                    }

                    @Override
                    public void connectFailed(URI uri, SocketAddress sa, IOException ioe) {
                        Log.w(TAG, "Proxy connect failed for " + uri + ": " + ioe.getMessage());
                        String host = uri.getHost();
                        if (isTarget(host)) {
                            EchProxyModule.addLog("error", "connect", host + " 连接失败: " + ioe.getMessage());
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
                        String ip = getCachedIp(host);
                        Log.d(TAG, host + fullUrl + " -> proxy -> " + ip);
                        EchProxyModule.addLog("info", "connect", host + fullUrl + " -> " + ip);
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
                .cache(new Cache(httpCacheDir, cacheSize));

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

        return builder.build();
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

    private static String getCachedIp(String hostname) {
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
}
