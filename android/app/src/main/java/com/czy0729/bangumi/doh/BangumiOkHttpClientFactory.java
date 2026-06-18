package com.czy0729.bangumi.doh;

import android.util.Log;

import com.facebook.react.modules.network.OkHttpClientFactory;
import com.facebook.react.modules.network.OkHttpClientProvider;

import java.io.File;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Proxy;
import java.net.ProxySelector;
import java.net.SocketAddress;
import java.net.URI;
import java.security.SecureRandom;
import java.security.cert.X509Certificate;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.net.ssl.SSLContext;
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

    /** Shared singleton TrustManager — avoids two SSLContext instances racing inside BoringSSL */
    static final X509TrustManager SHARED_TRUST_MANAGER = new X509TrustManager() {
        @Override
        public void checkClientTrusted(X509Certificate[] chain, String authType) {}
        @Override
        public void checkServerTrusted(X509Certificate[] chain, String authType) {}
        @Override
        public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
    };

    /** Shared singleton SSLSocketFactory */
    static final javax.net.ssl.SSLSocketFactory SHARED_SSL_FACTORY;
    static {
        try {
            SSLContext ctx = SSLContext.getInstance("TLS");
            ctx.init(null, new TrustManager[]{SHARED_TRUST_MANAGER}, new SecureRandom());
            SHARED_SSL_FACTORY = ctx.getSocketFactory();
        } catch (Exception e) {
            throw new RuntimeException("Failed to init shared SSLContext", e);
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
                    // Only route target domains through ECHProxy
                    private final String[] TARGETS = {
                        "bgm.tv", "chii.in", "lain.bgm.tv",
                        "next.bgm.tv", "api.bgm.tv", "cloudflare-dns.com"
                    };

                    private boolean isTarget(String host) {
                        if (host == null) return false;
                        for (String target : TARGETS) {
                            if (host.equals(target) || host.endsWith("." + target)) {
                                return true;
                            }
                        }
                        return false;
                    }

                    @Override
                    public List<Proxy> select(URI uri) {
                        String host = uri.getHost();
                        int port = EchProxyModule.getProxyPort();
                        if (port > 0 && isTarget(host)) {
                            Log.d(TAG, "Using EchProxy at 127.0.0.1:" + port + " for " + host);
                            return Collections.singletonList(
                                new Proxy(Proxy.Type.HTTP, new InetSocketAddress("127.0.0.1", port))
                            );
                        }
                        return Collections.singletonList(Proxy.NO_PROXY);
                    }

                    @Override
                    public void connectFailed(URI uri, SocketAddress sa, IOException ioe) {
                        Log.w(TAG, "Proxy connect failed for " + uri + ": " + ioe.getMessage());
                    }
                })
                .cache(new Cache(httpCacheDir, cacheSize));

        // Trust all certificates for ECHProxy MITM
        builder.sslSocketFactory(SHARED_SSL_FACTORY, SHARED_TRUST_MANAGER);
        builder.hostnameVerifier((hostname, session) -> true);

        return builder.build();
    }
}
