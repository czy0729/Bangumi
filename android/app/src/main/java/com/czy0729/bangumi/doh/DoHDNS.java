package com.czy0729.bangumi.doh;

import android.util.Log;

import androidx.annotation.NonNull;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import android.os.SystemClock;

import okhttp3.Dns;

/**
 * Target-domain DNS resolver for OkHttp.
 *
 * For target Bangumi domains, resolves via:
 * 1. In-memory cache (5 min TTL)
 * 2. EchProxy persistent cache (target_ips.txt) - shared from Rust layer
 * 3. System DNS fallback (polluted, last resort)
 *
 * This single instance is shared by both NetworkingModule (fetch/XHR)
 * and FastImage/Glide, so images automatically use clean DNS.
 */
public class DoHDNS implements Dns {

    private static final String TAG = "DoHDNS";

    /** Target domains for ECH proxy (must stay in sync with src/config.ts ECH_TARGET_DOMAINS) */
    private static final List<String> TARGETS = Arrays.asList(
            "bgm.tv", "chii.in", "lain.bgm.tv", "next.bgm.tv", "api.bgm.tv"
    );

    private static final long CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

    private static final DoHDNS INSTANCE = new DoHDNS();

    public static DoHDNS getInstance() {
        return INSTANCE;
    }

    // EchProxy cache directory
    private volatile File echCacheDir = null;

    private final ConcurrentHashMap<String, CacheEntry> cache = new ConcurrentHashMap<>();

    private static class CacheEntry {
        final List<InetAddress> addresses;
        final long createdAt;

        CacheEntry(List<InetAddress> addresses) {
            this.addresses = addresses;
            this.createdAt = SystemClock.elapsedRealtime();
        }

        boolean isExpired() {
            return SystemClock.elapsedRealtime() - createdAt > CACHE_TTL_MS;
        }
    }

    /**
     * Set EchProxy cache directory.
     * Called from EchProxyModule after proxy starts successfully.
     */
    public void setEchProxy(String cacheDir) {
        if (cacheDir != null) {
            this.echCacheDir = new File(cacheDir);
            Log.d(TAG, "EchProxy cache dir: " + cacheDir);
        }
    }

    /**
     * Get EchProxy cache directory for use by other components.
     * Returns null if not set.
     */
    public File getEchProxyCacheDir() {
        return echCacheDir;
    }

    @NonNull
    @Override
    public List<InetAddress> lookup(@NonNull String hostname) throws UnknownHostException {
        if (!isTarget(hostname)) {
            return Dns.SYSTEM.lookup(hostname);
        }

        // Use synchronized to ensure atomic get-check-put operations
        // This prevents multiple threads from reading the file simultaneously
        synchronized (cache) {
            // 1. Check in-memory cache first
            CacheEntry cached = cache.get(hostname);
            if (cached != null && !cached.isExpired()) {
                Log.d(TAG, hostname + " -> " + cached.addresses + " (cached)");
                return cached.addresses;
            }

            // 2. Try EchProxy persistent cache (target_ips.txt)
            List<InetAddress> echResult = readEchCache(hostname);
            if (echResult != null && !echResult.isEmpty()) {
                cache.put(hostname, new CacheEntry(echResult));
                Log.d(TAG, hostname + " -> " + echResult + " (EchProxy cache)");
                return echResult;
            }
        }

        // 3. System DNS fallback (polluted, but no other option without EchProxy cache)
        Log.d(TAG, hostname + " -> system DNS fallback (EchProxy cache not available)");
        return Dns.SYSTEM.lookup(hostname);
    }

    private boolean isTarget(String hostname) {
        for (String target : TARGETS) {
            if (hostname.equals(target) || hostname.endsWith("." + target)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Read DNS result from EchProxy's target_ips.txt cache.
     * Format: "hostname|ip1,ip2,ip3" per line (Rust uses | as separator)
     */
    private List<InetAddress> readEchCache(String hostname) {
        if (echCacheDir == null) {
            return null;
        }

        File cacheFile = new File(echCacheDir, "target_ips.txt");
        if (!cacheFile.exists()) {
            return null;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(cacheFile))) {
            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (line.isEmpty() || line.startsWith("#")) {
                    continue;
                }

                // Rust format: "hostname|ip1,ip2,ip3"
                String[] parts = line.split("\\|", 2);
                if (parts.length == 2 && parts[0].equals(hostname)) {
                    String[] ips = parts[1].split(",");
                    List<InetAddress> results = new ArrayList<>();
                    for (String ip : ips) {
                        ip = ip.trim();
                        if (!ip.isEmpty()) {
                            try {
                                results.add(InetAddress.getByName(ip));
                            } catch (Exception ignored) {
                            }
                        }
                    }
                    if (!results.isEmpty()) {
                        Log.d(TAG, "Read " + results.size() + " IPs from EchProxy cache for " + hostname);
                        return results;
                    }
                }
            }
        } catch (IOException e) {
            Log.w(TAG, "Failed to read EchProxy cache: " + e.getMessage());
        }

        return null;
    }
}
