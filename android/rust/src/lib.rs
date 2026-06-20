use std::io::{self, BufRead, BufReader, Read, Write};
use std::net::{Ipv4Addr, SocketAddrV4, TcpListener, TcpStream, ToSocketAddrs, UdpSocket};
use std::path::PathBuf;
use std::sync::Arc;
use std::thread;
use std::time::Instant;

use foreign_types_shared::ForeignType;
#[cfg(has_ech)]
use foreign_types_shared::ForeignTypeRef;
use parking_lot::Mutex;

// Android logging
#[cfg(target_os = "android")]
extern "C" {
    fn __android_log_print(prio: i32, tag: *const u8, fmt: *const u8, ...) -> i32;
}

const ANDROID_LOG_DEBUG: i32 = 3;
const ANDROID_LOG_ERROR: i32 = 6;

macro_rules! log_d {
    ($($arg:tt)*) => {
        // Only log in debug builds to avoid performance overhead in production
        #[cfg(debug_assertions)]
        {
            #[cfg(target_os = "android")]
            {
                let msg = std::ffi::CString::new(format!($($arg)*)).unwrap();
                let tag = b"EchProxy\0";
                unsafe {
                    __android_log_print(ANDROID_LOG_DEBUG, tag.as_ptr(), b"%s\0".as_ptr(), msg.as_ptr());
                }
            }
            #[cfg(not(target_os = "android"))]
            eprintln!($($arg)*);
        }
    };
}

macro_rules! log_e {
    ($($arg:tt)*) => {
        #[cfg(target_os = "android")]
        {
            let msg = std::ffi::CString::new(format!($($arg)*)).unwrap();
            let tag = b"EchProxy\0";
            unsafe {
                __android_log_print(ANDROID_LOG_ERROR, tag.as_ptr(), b"%s\0".as_ptr(), msg.as_ptr());
            }
            // msg is dropped here, after __android_log_print has finished
        }
        #[cfg(not(target_os = "android"))]
        eprintln!($($arg)*);
    };
}

#[cfg(has_ech)]
unsafe extern "C" {
    fn ech_get_retry_config(host: *const std::os::raw::c_char, port: std::os::raw::c_int, outer_sni: *const std::os::raw::c_char, out_cfg: *mut *mut u8, out_len: *mut usize) -> std::os::raw::c_int;
    fn ech_free(p: *mut std::os::raw::c_void);
}

#[cfg(has_ech)]
mod ffi {
    use std::os::raw::{c_char, c_int};
    unsafe extern "C" {
        pub fn SSL_set1_ech_config_list(s: *mut openssl_sys::SSL, ecl: *const u8, len: usize) -> c_int;
        pub fn SSL_ech_set1_server_names(s: *mut openssl_sys::SSL, inner: *const c_char, outer: *const c_char, no_outer: c_int) -> c_int;
        pub fn SSL_ech_get1_status(s: *mut openssl_sys::SSL, inner: *mut *mut c_char, outer: *mut *mut c_char) -> c_int;
    }
}

#[cfg(has_ech)]
const OUTER_SNI: &str = "cloudflare-ech.com";
/// Target domains for ECH proxy (must stay in sync with src/config.ts ECH_TARGET_DOMAINS)
const TARGETS: &[&str] = &["chii.in", "lain.bgm.tv", "bgm.tv", "next.bgm.tv", "api.bgm.tv", "cloudflare-dns.com"];

const CF_DOH_IPS: &[Ipv4Addr] = &[
    Ipv4Addr::new(104, 16, 248, 249),
    Ipv4Addr::new(104, 16, 249, 249),
    Ipv4Addr::new(1, 1, 1, 1),
    Ipv4Addr::new(1, 0, 0, 1),
];
const CF_DOH_HOST: &str = "cloudflare-dns.com";

/// Cloudflare IPv4 CIDR ranges: (network_u32, prefix_len)
const CLOUDFLARE_CIDRS: &[(u32, u8)] = &[
    (ipv4_to_u32(104, 16, 0, 0), 13),
    (ipv4_to_u32(104, 24, 0, 0), 14),
    (ipv4_to_u32(172, 64, 0, 0), 13),
    (ipv4_to_u32(131, 0, 72, 0), 22),
    (ipv4_to_u32(162, 158, 0, 0), 15),
    (ipv4_to_u32(190, 93, 240, 0), 20),
    (ipv4_to_u32(188, 114, 96, 0), 20),
    (ipv4_to_u32(197, 234, 240, 0), 22),
    (ipv4_to_u32(198, 41, 128, 0), 17),
    (ipv4_to_u32(173, 245, 48, 0), 20),
    (ipv4_to_u32(103, 21, 244, 0), 22),
    (ipv4_to_u32(103, 22, 200, 0), 22),
    (ipv4_to_u32(103, 31, 4, 0), 22),
    (ipv4_to_u32(141, 101, 64, 0), 18),
    (ipv4_to_u32(108, 162, 192, 0), 18),
];

const fn ipv4_to_u32(a: u8, b: u8, c: u8, d: u8) -> u32 {
    ((a as u32) << 24) | ((b as u32) << 16) | ((c as u32) << 8) | d as u32
}

fn is_target(host: &str) -> bool {
    TARGETS.iter().any(|&t| host == t || host.ends_with(&format!(".{t}")))
}

fn is_cloudflare_ip(ip: Ipv4Addr) -> bool {
    let ip_u = ipv4_to_u32(ip.octets()[0], ip.octets()[1], ip.octets()[2], ip.octets()[3]);
    CLOUDFLARE_CIDRS.iter().any(|&(net, prefix)| {
        let mask = u32::MAX << (32 - prefix);
        (ip_u & mask) == (net & mask)
    })
}

// ============================= CA ===========================================

struct MitmCa {
    ca_key: rcgen::KeyPair,
    ca_cert: rcgen::Certificate,
    cert_cache: Mutex<std::collections::HashMap<String, Arc<rustls::ServerConfig>>>,
}

impl MitmCa {
    fn load_or_generate(ca_dir: &str) -> io::Result<Self> {
        let dir = std::path::PathBuf::from(ca_dir);
        let cp = dir.join("ca.pem");
        let kp = dir.join("ca-key.pem");

        if cp.exists() && kp.exists() {
            let key_pem = std::fs::read_to_string(&kp)
                .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("read ca-key: {e}")))?;
            let key = rcgen::KeyPair::from_pem(&key_pem)
                .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("parse ca-key: {e}")))?;
            let mut p = rcgen::CertificateParams::new(vec!["bangumi-proxy CA".into()])
                .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("ca params: {e}")))?;
            p.is_ca = rcgen::IsCa::Ca(rcgen::BasicConstraints::Unconstrained);
            let cert = p.self_signed(&key)
                .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("self sign: {e}")))?;
            return Ok(Self { ca_cert: cert, ca_key: key, cert_cache: Mutex::new(std::collections::HashMap::new()) });
        }

        let key = rcgen::KeyPair::generate()
            .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("gen key: {e}")))?;
        let mut p = rcgen::CertificateParams::new(vec!["bangumi-proxy CA".into()])
            .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("ca params: {e}")))?;
        p.is_ca = rcgen::IsCa::Ca(rcgen::BasicConstraints::Unconstrained);
        let cert = p.self_signed(&key)
            .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("self sign: {e}")))?;
        std::fs::write(&cp, cert.pem())
            .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("write ca.pem: {e}")))?;
        std::fs::write(&kp, key.serialize_pem())
            .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("write ca-key: {e}")))?;
        Ok(Self { ca_cert: cert, ca_key: key, cert_cache: Mutex::new(std::collections::HashMap::new()) })
    }

    fn server_config(&self, host: &str) -> io::Result<Arc<rustls::ServerConfig>> {
        // 先查缓存, 命中则直接返回
        {
            let cache = self.cert_cache.lock();
            if let Some(cfg) = cache.get(host) {
                return Ok(Arc::clone(cfg));
            }
        }

        // 未命中, 生成新的证书和 config (加锁防止并发生成)
        let mut cache = self.cert_cache.lock();
        // double-check: 另一个线程可能已经生成了
        if let Some(cfg) = cache.get(host) {
            return Ok(Arc::clone(cfg));
        }

        let hk = rcgen::KeyPair::generate()
            .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("gen host key: {e}")))?;
        let mut p = rcgen::CertificateParams::new(vec![host.into()])
            .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("host params: {e}")))?;
        p.distinguished_name = rcgen::DistinguishedName::new();
        let hc = p.signed_by(&hk, &self.ca_cert, &self.ca_key)
            .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("sign host cert: {e}")))?;
        let certs = vec![
            rustls::pki_types::CertificateDer::from(hc.der().to_vec()),
            rustls::pki_types::CertificateDer::from(self.ca_cert.der().to_vec()),
        ];
        let key = rustls::pki_types::PrivatePkcs8KeyDer::from(hk.serialize_der());
        let cfg = rustls::ServerConfig::builder()
            .with_no_client_auth()
            .with_single_cert(certs, rustls::pki_types::PrivateKeyDer::from(key))
            .map_err(|e| io::Error::new(io::ErrorKind::Other, format!("server config: {e}")))?;
        let cfg = Arc::new(cfg);
        cache.insert(host.to_string(), Arc::clone(&cfg));
        Ok(cfg)
    }
}

// ============================= ECH cache ====================================

/// Cache entry with TTL
struct CacheEntry<T: Clone> {
    value: T,
    created: Instant,
}

const IP_CACHE_TTL_SECS: u64 = 300; // 5 minutes
const ECH_CONFIG_TTL_SECS: u64 = 3600; // 1 hour
const CF_IPS_TTL_SECS: u64 = 3600; // 1 hour

struct EchCache {
    config: Mutex<Option<CacheEntry<Vec<u8>>>>,
    cf_ips: Mutex<Option<CacheEntry<Vec<Ipv4Addr>>>>,
    ips: Mutex<std::collections::HashMap<String, CacheEntry<Vec<Ipv4Addr>>>>,
    dns_servers: Vec<String>,
    cache_dir: PathBuf,
}

impl EchCache {
    fn new(dns: String, cache_dir: String) -> Self {
        // Parse dns into server list (split on comma for multi-server support)
        let dns_servers: Vec<String> = dns
            .split(',')
            .map(|s| s.trim().to_string())
            .filter(|s| !s.is_empty())
            .collect();
        let cache_path = PathBuf::from(&cache_dir);
        // Ensure cache directory exists
        let _ = std::fs::create_dir_all(&cache_path);

        let mut cache = Self {
            config: Mutex::new(None),
            cf_ips: Mutex::new(None),
            ips: Mutex::new(std::collections::HashMap::new()),
            dns_servers,
            cache_dir: cache_path,
        };
        cache.load_persistent_cache();
        cache
    }

    /// Load cached data from disk on startup
    fn load_persistent_cache(&mut self) {
        // Load ECH config
        let ech_path = self.cache_dir.join("ech_config.bin");
        if let Ok(data) = std::fs::read(&ech_path) {
            if !data.is_empty() {
                log_d!("Loaded cached ECH config: {} bytes", data.len());
                *self.config.lock() = Some(CacheEntry { value: data, created: Instant::now() });
            }
        }

        // Load CF DoH IPs
        let cf_path = self.cache_dir.join("cf_ips.txt");
        if let Ok(text) = std::fs::read_to_string(&cf_path) {
            let ips: Vec<Ipv4Addr> = text.lines()
                .filter_map(|l| l.trim().parse().ok())
                .collect();
            if !ips.is_empty() {
                log_d!("Loaded cached CF IPs: {:?}", ips);
                *self.cf_ips.lock() = Some(CacheEntry { value: ips, created: Instant::now() });
            }
        }

        // Load target IPs
        let targets_path = self.cache_dir.join("target_ips.txt");
        if let Ok(text) = std::fs::read_to_string(&targets_path) {
            for line in text.lines() {
                let parts: Vec<&str> = line.splitn(2, '|').collect();
                if parts.len() == 2 {
                    let host = parts[0].to_string();
                    let ips: Vec<Ipv4Addr> = parts[1].split(',')
                        .filter_map(|s| s.trim().parse().ok())
                        .collect();
                    if !ips.is_empty() {
                        log_d!("Loaded cached IPs for {}: {:?}", host, ips);
                        self.ips.lock().insert(host, CacheEntry {
                            value: ips,
                            created: Instant::now(),
                        });
                    }
                }
            }
        }
    }

    /// Save ECH config to disk
    fn save_ech_config(&self, data: &[u8]) {
        let path = self.cache_dir.join("ech_config.bin");
        if let Err(e) = std::fs::write(&path, data) {
            log_e!("Failed to save ECH config: {}", e);
        } else {
            log_d!("Saved ECH config: {} bytes", data.len());
        }
    }

    /// Save CF DoH IPs to disk
    fn save_cf_ips(&self, ips: &[Ipv4Addr]) {
        let path = self.cache_dir.join("cf_ips.txt");
        let text: String = ips.iter()
            .map(|ip| ip.to_string())
            .collect::<Vec<_>>()
            .join("\n");
        if let Err(e) = std::fs::write(&path, text) {
            log_e!("Failed to save CF IPs: {}", e);
        } else {
            log_d!("Saved CF IPs: {:?}", ips);
        }
    }

    /// Save target IPs to disk
    fn save_target_ips(&self) {
        let path = self.cache_dir.join("target_ips.txt");
        let cache = self.ips.lock();
        let text: String = cache.iter()
            .map(|(host, entry)| {
                let ips: String = entry.value.iter()
                    .map(|ip| ip.to_string())
                    .collect::<Vec<_>>()
                    .join(",");
                format!("{host}|{ips}")
            })
            .collect::<Vec<_>>()
            .join("\n");
        if let Err(e) = std::fs::write(&path, text) {
            log_e!("Failed to save target IPs: {}", e);
        } else {
            log_d!("Saved {} target IP entries", cache.len());
        }
    }

    /// Get ECH config, trying all CF DoH IPs
    fn get_ech(&self) -> io::Result<Vec<u8>> {
        {
            let cache = self.config.lock();
            if let Some(entry) = &*cache {
                if entry.created.elapsed().as_secs() < ECH_CONFIG_TTL_SECS {
                    return Ok(entry.value.clone());
                }
            }
        }
        for ip in self.cloudflare_doh_ips()? {
            match grease_ech(ip) {
                Ok(c) => {
                    log_d!("ECH GREASE succeeded via {ip}, {} bytes", c.len());
                    self.save_ech_config(&c);
                    *self.config.lock() = Some(CacheEntry { value: c.clone(), created: Instant::now() });
                    return Ok(c);
                }
                Err(e) => {
                    log_e!("ECH GREASE via {ip}: {e}");
                }
            }
        }
        Err(io::Error::new(io::ErrorKind::Other, "all CF DoH IPs failed for GREASE"))
    }

    /// Get target IPs for a host (multiple, filtered to CF IPs only)
    fn get_target_ips(&self, host: &str) -> io::Result<Vec<Ipv4Addr>> {
        // Check cache with TTL
        {
            let cache = self.ips.lock();
            if let Some(entry) = cache.get(host) {
                if entry.created.elapsed().as_secs() < IP_CACHE_TTL_SECS {
                    return Ok(entry.value.clone());
                }
            }
        }

        let mut ips = self.resolve_via_ech_multi(host)?;
        let original_len = ips.len();
        ips.retain(|ip| is_cloudflare_ip(*ip));
        if ips.is_empty() {
            return Err(io::Error::new(io::ErrorKind::Other, "target resolved to no Cloudflare IPs"));
        }
        if ips.len() != original_len {
            log_e!("{host}: ignored non-Cloudflare A records");
        }
        log_d!("{host} -> {:?} (ECH)", ips);
        self.ips.lock().insert(host.to_string(), CacheEntry { value: ips.clone(), created: Instant::now() });
        self.save_target_ips();
        Ok(ips)
    }

    /// Bootstrap CF DoH IPs (resolve via configured DNS, filter to CF range)
    fn cloudflare_doh_ips(&self) -> io::Result<Vec<Ipv4Addr>> {
        {
            let cache = self.cf_ips.lock();
            if let Some(entry) = &*cache {
                if entry.created.elapsed().as_secs() < CF_IPS_TTL_SECS {
                    return Ok(entry.value.clone());
                }
            }
        }

        let mut ips = match self.resolve_multi(CF_DOH_HOST) {
            Ok(ips) if !ips.is_empty() => ips,
            _ => {
                log_e!("{CF_DOH_HOST} bootstrap failed; using built-in IPs");
                CF_DOH_IPS.to_vec()
            }
        };
        let original_len = ips.len();
        ips.retain(|ip| is_cloudflare_ip(*ip));
        if ips.is_empty() {
            ips = CF_DOH_IPS.to_vec();
        }
        if ips.len() != original_len {
            log_e!("{CF_DOH_HOST}: ignored non-Cloudflare A records");
        }
        log_d!("{CF_DOH_HOST} -> {:?} (bootstrap)", ips);
        self.save_cf_ips(&ips);
        *self.cf_ips.lock() = Some(CacheEntry { value: ips.clone(), created: Instant::now() });
        Ok(ips)
    }

    /// Resolve host via all configured DNS servers, return all A records
    fn resolve_multi(&self, host: &str) -> io::Result<Vec<Ipv4Addr>> {
        let mut last_err = None;
        for server in &self.dns_servers {
            if server.starts_with("http") {
                match resolve_doh_multi(server, host) {
                    Ok(ips) if !ips.is_empty() => return Ok(ips),
                    Ok(_) => last_err = Some(io::Error::new(io::ErrorKind::NotFound, "no A")),
                    Err(e) => last_err = Some(e),
                }
            } else {
                match resolve_plain_dns(server, host) {
                    Ok(ip) => return Ok(vec![ip]),
                    Err(e) => last_err = Some(e),
                }
            }
        }
        Err(last_err.unwrap_or_else(|| io::Error::new(io::ErrorKind::NotFound, "no DNS servers")))
    }

    /// Resolve target host via Cloudflare DoH over ECH, return all A records
    fn resolve_via_ech_multi(&self, host: &str) -> io::Result<Vec<Ipv4Addr>> {
        let ecl = self.get_ech()?;
        let mut last_err = None;
        for cf_ip in self.cloudflare_doh_ips()? {
            match doh_query_via_ech(host, cf_ip, &ecl) {
                Ok(ips) if !ips.is_empty() => return Ok(ips),
                Ok(_) => {}
                Err(e) => {
                    log_e!("ECH DNS via {cf_ip}: {e}");
                    last_err = Some(e);
                }
            }
        }
        self.invalidate();
        Err(last_err.unwrap_or_else(|| io::Error::new(io::ErrorKind::Other, "all CF IPs failed")))
    }

    fn invalidate(&self) {
        self.config.lock().take();
    }

    fn invalidate_ips(&self, host: &str) {
        self.ips.lock().remove(host);
    }
}

// ============================= DNS =========================================

fn tls_skip() -> openssl::ssl::SslConnector {
    let mut b = openssl::ssl::SslConnector::builder(openssl::ssl::SslMethod::tls_client()).unwrap();
    b.set_verify(openssl::ssl::SslVerifyMode::NONE);
    b.build()
}

fn doh_json(host: &str, path: &str) -> io::Result<String> {
    let tcp = TcpStream::connect(format!("{host}:443"))?;
    tcp.set_read_timeout(Some(std::time::Duration::from_secs(5)))?;
    let mut s = tls_skip()
        .connect(host, tcp)
        .map_err(|e| io::Error::new(io::ErrorKind::Other, e.to_string()))?;
    s.write_all(
        format!("GET {path} HTTP/1.1\r\nHost: {host}\r\nAccept: application/dns-json\r\nConnection: close\r\n\r\n")
            .as_bytes(),
    )?;
    s.flush()?;
    let mut buf = vec![];
    s.read_to_end(&mut buf)?;
    let h = buf
        .windows(4)
        .position(|w| w == b"\r\n\r\n")
        .ok_or_else(|| io::Error::new(io::ErrorKind::InvalidData, "no hdr"))?;
    String::from_utf8(buf[h + 4..].to_vec()).map_err(|_| io::Error::new(io::ErrorKind::InvalidData, "utf8"))
}

/// Parse all A records from DoH JSON response
fn parse_a_records(json: &str) -> Vec<Ipv4Addr> {
    let Some(answer) = json.find("\"Answer\"") else {
        return Vec::new();
    };
    let mut ips = Vec::new();
    let mut rest = &json[answer..];
    while let Some(data) = rest.find("\"data\":\"") {
        let addr = &rest[data + 8..];
        let Some(end) = addr.find('"') else { break; };
        if let Ok(ip) = addr[..end].parse::<Ipv4Addr>() {
            if !ips.contains(&ip) {
                ips.push(ip);
            }
        }
        rest = &addr[end..];
    }
    ips
}

/// Resolve via DoH server, return all A records
fn resolve_doh_multi(server: &str, host: &str) -> io::Result<Vec<Ipv4Addr>> {
    let base = server.trim_start_matches("https://").trim_start_matches("http://");
    let (doh_host, path) = base
        .split_once('/')
        .map(|(h, p)| (h, format!("/{p}")))
        .unwrap_or((base, "/dns-query".into()));
    let json = doh_json(doh_host, &format!("{path}?name={host}&type=A"))?;
    let ips = parse_a_records(&json);
    if ips.is_empty() {
        Err(io::Error::new(io::ErrorKind::NotFound, "no A"))
    } else {
        Ok(ips)
    }
}

/// DoH query over ECH to a specific CF DoH IP, return all A records
#[cfg(has_ech)]
fn doh_query_via_ech(host: &str, cf_ip: Ipv4Addr, ecl: &[u8]) -> io::Result<Vec<Ipv4Addr>> {
    let mut backend = connect_ech(CF_DOH_HOST, cf_ip, ecl)?;
    backend.write_all(
        format!("GET /dns-query?name={host}&type=A HTTP/1.1\r\nHost: {CF_DOH_HOST}\r\nAccept: application/dns-json\r\nConnection: close\r\n\r\n")
            .as_bytes(),
    )?;
    backend.flush()?;
    let mut buf = vec![];
    backend.read_to_end(&mut buf)?;
    let h = buf
        .windows(4)
        .position(|w| w == b"\r\n\r\n")
        .ok_or_else(|| io::Error::new(io::ErrorKind::InvalidData, "no hdr"))?;
    let ips = parse_a_records(&String::from_utf8_lossy(&buf[h + 4..]));
    if ips.is_empty() {
        Err(io::Error::new(io::ErrorKind::NotFound, "no A"))
    } else {
        Ok(ips)
    }
}

#[cfg(no_ech)]
fn doh_query_via_ech(_host: &str, _cf_ip: Ipv4Addr, _ecl: &[u8]) -> io::Result<Vec<Ipv4Addr>> {
    Err(io::Error::new(io::ErrorKind::Unsupported, "ECH not available"))
}

fn skip_name(data: &[u8], mut p: usize) -> io::Result<usize> {
    loop {
        if p >= data.len() {
            return Err(io::Error::new(io::ErrorKind::InvalidData, "overflow"));
        }
        let b = data[p];
        if b == 0 {
            return Ok(p + 1);
        }
        if b & 0xC0 == 0xC0 {
            return Ok(p + 2);
        }
        p += 1 + b as usize;
    }
}

fn resolve_plain_dns(server: &str, host: &str) -> io::Result<std::net::Ipv4Addr> {
    let txid: u16 = 0x1234;
    let mut pkt = Vec::with_capacity(512);
    pkt.extend_from_slice(&txid.to_be_bytes());
    pkt.extend_from_slice(&[1, 0, 0, 1, 0, 0, 0, 0, 0, 0]);
    for l in host.split('.') {
        pkt.push(l.len() as u8);
        pkt.extend_from_slice(l.as_bytes());
    }
    pkt.push(0);
    pkt.extend_from_slice(&[0, 1, 0, 1]);
    let sock = UdpSocket::bind("0.0.0.0:0")?;
    sock.set_read_timeout(Some(std::time::Duration::from_secs(5)))?;
    sock.send_to(&pkt, format!("{server}:53"))?;
    let mut buf = [0u8; 1024];
    let (n, _) = sock.recv_from(&mut buf)?;
    let r = &buf[..n];
    if r.len() < 12 || u16::from_be_bytes([r[0], r[1]]) != txid {
        return Err(io::Error::new(io::ErrorKind::InvalidData, "bad DNS"));
    }
    let an = u16::from_be_bytes([r[6], r[7]]) as usize;
    let mut p = skip_name(r, 12)? + 4;
    for _ in 0..an {
        p = skip_name(r, p)?;
        if p + 10 > r.len() {
            break;
        }
        let t = u16::from_be_bytes([r[p], r[p + 1]]);
        let rl = u16::from_be_bytes([r[p + 8], r[p + 9]]) as usize;
        p += 10;
        if t == 1 && rl == 4 && p + 4 <= r.len() {
            return Ok(std::net::Ipv4Addr::new(r[p], r[p + 1], r[p + 2], r[p + 3]));
        }
        p += rl;
    }
    Err(io::Error::new(io::ErrorKind::NotFound, "no A"))
}

#[cfg(has_ech)]
fn grease_ech(ip: std::net::Ipv4Addr) -> io::Result<Vec<u8>> {
    let h = std::ffi::CString::new(ip.to_string()).unwrap();
    let s = std::ffi::CString::new(OUTER_SNI).unwrap();
    let (mut c, mut l): (*mut u8, usize) = (std::ptr::null_mut(), 0);
    let r = unsafe { ech_get_retry_config(h.as_ptr(), 443, s.as_ptr(), &mut c, &mut l) };
    if r == 1 && !c.is_null() && l > 0 {
        let d = unsafe { std::slice::from_raw_parts(c, l).to_vec() };
        unsafe { ech_free(c as *mut _) };
        Ok(d)
    } else {
        Err(io::Error::new(io::ErrorKind::Other, "GREASE failed"))
    }
}

#[cfg(no_ech)]
fn grease_ech(_ip: std::net::Ipv4Addr) -> io::Result<Vec<u8>> {
    Err(io::Error::new(
        io::ErrorKind::Unsupported,
        "ECH not available",
    ))
}

// ============================= ECH backend ==================================

static INIT: std::sync::Once = std::sync::Once::new();

#[cfg(has_ech)]
fn connect_ech(host: &str, ip: Ipv4Addr, ecl: &[u8]) -> io::Result<openssl::ssl::SslStream<TcpStream>> {
    INIT.call_once(|| openssl::init());
    let mut ctx = openssl::ssl::SslContext::builder(openssl::ssl::SslMethod::tls_client())
        .map_err(|e| io::Error::new(io::ErrorKind::Other, e.to_string()))?;
    ctx.set_min_proto_version(Some(openssl::ssl::SslVersion::TLS1_3))
        .map_err(|e| io::Error::new(io::ErrorKind::Other, e.to_string()))?;
    ctx.set_verify(openssl::ssl::SslVerifyMode::NONE);
    let ctx = ctx.build();
    let ssl = openssl::ssl::Ssl::new(&ctx).map_err(|e| io::Error::new(io::ErrorKind::Other, e.to_string()))?;
    if unsafe { ffi::SSL_set1_ech_config_list(ssl.as_ptr(), ecl.as_ptr(), ecl.len()) } != 1 {
        return Err(io::Error::new(io::ErrorKind::Other, "ech_config"));
    }
    let ci = std::ffi::CString::new(host).unwrap();
    let co = std::ffi::CString::new(OUTER_SNI).unwrap();
    unsafe { ffi::SSL_ech_set1_server_names(ssl.as_ptr(), ci.as_ptr(), co.as_ptr(), 0) };
    let tcp = TcpStream::connect_timeout(
        &SocketAddrV4::new(ip, 443).into(),
        std::time::Duration::from_secs(10),
    )?;
    tcp.set_read_timeout(Some(std::time::Duration::from_secs(10)))?;
    tcp.set_write_timeout(Some(std::time::Duration::from_secs(10)))?;
    let st = ssl.connect(tcp).map_err(|e| io::Error::new(io::ErrorKind::Other, e.to_string()))?;
    let _ = unsafe { ffi::SSL_ech_get1_status(st.ssl().as_ptr(), std::ptr::null_mut(), std::ptr::null_mut()) };
    Ok(st)
}

#[cfg(no_ech)]
fn connect_ech(_host: &str, _ip: Ipv4Addr, _ecl: &[u8]) -> io::Result<openssl::ssl::SslStream<TcpStream>> {
    Err(io::Error::new(io::ErrorKind::Unsupported, "ECH not available"))
}

fn connect_direct(host: &str, connect_ip: Option<Ipv4Addr>) -> io::Result<openssl::ssl::SslStream<TcpStream>> {
    INIT.call_once(|| openssl::init());
    let mut ctx = openssl::ssl::SslContext::builder(openssl::ssl::SslMethod::tls_client())
        .map_err(|e| io::Error::new(io::ErrorKind::Other, e.to_string()))?;
    ctx.set_verify(openssl::ssl::SslVerifyMode::NONE);
    let ctx = ctx.build();
    let ssl = openssl::ssl::Ssl::new(&ctx).map_err(|e| io::Error::new(io::ErrorKind::Other, e.to_string()))?;
    let host_c = std::ffi::CString::new(host).unwrap();
    unsafe { openssl_sys::SSL_set_tlsext_host_name(ssl.as_ptr(), host_c.as_ptr() as *mut _) };
    let tcp = match connect_ip {
        Some(ip) => TcpStream::connect_timeout(
            &SocketAddrV4::new(ip, 443).into(),
            std::time::Duration::from_secs(15),
        )?,
        None => TcpStream::connect(format!("{host}:443"))?,
    };
    tcp.set_read_timeout(Some(std::time::Duration::from_secs(15)))?;
    tcp.set_write_timeout(Some(std::time::Duration::from_secs(15)))?;
    let st = ssl.connect(tcp).map_err(|e| io::Error::new(io::ErrorKind::Other, e.to_string()))?;
    Ok(st)
}

/// Open backend connection. For target hosts: ECH only, multi-IP retry.
/// For non-target hosts: direct TLS.
fn open_backend(host: &str, cache: &EchCache) -> io::Result<openssl::ssl::SslStream<TcpStream>> {
    if !is_target(host) {
        return connect_direct(host, None);
    }

    // Target host: ECH with multi-IP retry
    let ips = cache.get_target_ips(host)?;
    let ecl = match cache.get_ech() {
        Ok(ecl) => ecl,
        Err(e) => {
            cache.invalidate();
            return Err(e);
        }
    };

    let mut last_err = None;
    for ip in &ips {
        if !is_cloudflare_ip(*ip) {
            log_e!("{host} -> {ip}: non-CF IP, skipping ECH");
            continue;
        }
        match connect_ech(host, *ip, &ecl) {
            Ok(s) => {
                log_d!("ECH connection successful: {host} -> {ip}");
                return Ok(s);
            }
            Err(e) if is_timeout(&e) => {
                log_e!("ECH {host} -> {ip}: timeout, trying next IP");
                last_err = Some(e);
            }
            Err(e) => {
                log_e!("ECH {host} -> {ip}: {e}");
                cache.invalidate();
                cache.invalidate_ips(host);
                last_err = Some(e);
            }
        }
    }
    Err(last_err.unwrap_or_else(|| io::Error::new(io::ErrorKind::Other, "all target IPs failed")))
}

fn is_timeout(err: &io::Error) -> bool {
    err.kind() == io::ErrorKind::TimedOut
}

// ============================= Proxy Handler ================================

fn handle_connect(client: &mut TcpStream, host: &str, cache: &EchCache, ca: &MitmCa) {
    if !is_target(host) {
        // Non-target domains should never reach here if proxySelector is correct
        // But as safety measure, just close connection silently
        log_d!("handle_connect: rejecting non-target host: {}", host);
        return;
    }
    handle_mitm(client, host, cache, ca);
}

#[allow(dead_code)]
fn handle_tunnel(client: &mut TcpStream, host: &str, _cache: &EchCache) {
    let connect_addr = format!("{host}:443");
    let mut remote = match TcpStream::connect(&connect_addr) {
        Ok(s) => s,
        Err(_) => return,
    };
    remote.set_read_timeout(Some(std::time::Duration::from_secs(60))).ok();
    remote.set_write_timeout(Some(std::time::Duration::from_secs(60))).ok();
    let _ = client.write_all(b"HTTP/1.1 200 Connection Established\r\n\r\n");
    let _ = client.flush();

    client.set_nonblocking(true).ok();
    remote.set_nonblocking(true).ok();
    let relay_start = Instant::now();
    let relay_timeout = std::time::Duration::from_secs(300);
    let mut last_activity = Instant::now();
    let idle_timeout = std::time::Duration::from_secs(60);
    let mut buf = vec![0u8; 32768]; // 32KB buffer

    loop {
        if relay_start.elapsed() > relay_timeout {
            log_e!("handle_tunnel: relay timeout for {}", host);
            break;
        }
        if last_activity.elapsed() > idle_timeout {
            log_d!("handle_tunnel: idle timeout for {}", host);
            break;
        }

        let mut activity = false;
        match client.read(&mut buf) {
            Ok(0) => break,
            Ok(n) => {
                let _ = remote.write_all(&buf[..n]);
                let _ = remote.flush();
                last_activity = Instant::now();
                activity = true;
            }
            Err(ref e) if e.kind() == io::ErrorKind::WouldBlock => {}
            Err(_) => break,
        }
        match remote.read(&mut buf) {
            Ok(0) => break,
            Ok(n) => {
                let _ = client.write_all(&buf[..n]);
                let _ = client.flush();
                last_activity = Instant::now();
                activity = true;
            }
            Err(ref e) if e.kind() == io::ErrorKind::WouldBlock => {}
            Err(_) => break,
        }
        if !activity {
            thread::sleep(std::time::Duration::from_millis(5));
        }
    }
    client.set_nonblocking(false).ok();
}

fn handle_mitm(client: &mut TcpStream, host: &str, cache: &EchCache, ca: &MitmCa) {
    log_d!("handle_mitm: {}", host);

    // Per-host 互斥: 串行化 open_backend + TLS 握手, relay 阶段不持锁
    let mut browser_tls;
    let mut backend;
    {
        let host_lock = get_host_lock(host);
        let _host_guard = host_lock.lock();

        backend = match open_backend(host, cache) {
            Ok(s) => s,
            Err(e) => { log_e!("handle_mitm: open_backend failed: {}", e); return; },
        };
        if let Err(e) = client.write_all(b"HTTP/1.1 200 Connection Established\r\n\r\n") {
            log_e!("handle_mitm: write 200 failed: {}", e);
            return;
        }
        if let Err(e) = client.flush() {
            log_e!("handle_mitm: flush 200 failed: {}", e);
            return;
        }
        log_d!("handle_mitm: sent 200, waiting for client TLS");
        let config = match ca.server_config(host) {
            Ok(c) => c,
            Err(e) => { log_e!("handle_mitm: server_config failed: {}", e); return; },
        };
        let mut acceptor = rustls::server::Acceptor::default();
        let mut tcp = match client.try_clone() {
            Ok(c) => c,
            Err(e) => { log_e!("handle_mitm: try_clone failed: {}", e); return; },
        };
        let accept_start = Instant::now();
        let accept_timeout = std::time::Duration::from_secs(15);
        let accepted = loop {
            if accept_start.elapsed() > accept_timeout {
                log_e!("handle_mitm: TLS accept timed out for {}", host);
                return;
            }
            match acceptor.accept() {
                Ok(Some(a)) => {
                    log_d!("handle_mitm: TLS accept succeeded");
                    break a;
                },
                Ok(None) => {
                    let mut buf = [0u8; 4096];
                    match tcp.read(&mut buf) {
                        Ok(0) => {
                            log_e!("handle_mitm: client closed before TLS");
                            return;
                        },
                        Ok(n) => {
                            log_d!("handle_mitm: read {} bytes from client", n);
                            if acceptor.read_tls(&mut &buf[..n]).is_err() {
                                log_e!("handle_mitm: read_tls failed");
                                return;
                            }
                        }
                        Err(ref e) if e.kind() == io::ErrorKind::WouldBlock => {
                            thread::sleep(std::time::Duration::from_millis(10));
                            continue;
                        }
                        Err(e) => {
                            log_e!("handle_mitm: client read error: {}", e);
                            return;
                        }
                    }
                }
                Err((_, e)) => {
                    log_e!("handle_mitm: acceptor error: {:?}", e);
                    return;
                }
            }
        };
        browser_tls = match accepted.into_connection(config) {
            Ok(c) => { log_d!("handle_mitm: into_connection OK"); c },
            Err((_, e)) => { log_e!("handle_mitm: into_connection failed: {:?}", e); return; },
        };
    }
    // _host_guard 已释放, 不同连接可以并行 relay
    log_d!("handle_mitm: starting data relay for {}", host);
    client.set_nonblocking(true).ok();
    backend.get_ref().set_nonblocking(true).ok();
    let mut bs = rustls::Stream::new(&mut browser_tls, &mut *client);
    let relay_start = Instant::now();
    let relay_timeout = std::time::Duration::from_secs(300); // 5 min max for large images
    let mut last_activity = Instant::now();
    let idle_timeout = std::time::Duration::from_secs(60); // 60s idle timeout
    let mut buf = vec![0u8; 32768]; // Larger buffer for images (32KB)

    loop {
        // Check timeouts
        if relay_start.elapsed() > relay_timeout {
            log_e!("handle_mitm: relay timeout for {}", host);
            break;
        }
        if last_activity.elapsed() > idle_timeout {
            log_d!("handle_mitm: idle timeout for {}", host);
            break;
        }

        let mut activity = false;
        match bs.read(&mut buf) {
            Ok(0) => {
                log_d!("handle_mitm: client EOF");
                break;
            }
            Ok(n) => {
                if let Err(e) = backend.write_all(&buf[..n]) {
                    log_e!("handle_mitm: backend write failed: {}", e);
                    break;
                }
                backend.flush().ok();
                last_activity = Instant::now();
                activity = true;
            }
            Err(ref e) if e.kind() == io::ErrorKind::WouldBlock => {}
            Err(ref e) if e.kind() == io::ErrorKind::TimedOut => {
                break;
            }
            Err(e) => {
                log_e!("handle_mitm: client read error: {}", e);
                break;
            }
        }
        match backend.read(&mut buf) {
            Ok(0) => {
                log_d!("handle_mitm: backend EOF");
                break;
            }
            Ok(n) => {
                if let Err(e) = bs.write_all(&buf[..n]) {
                    log_e!("handle_mitm: client write failed: {}", e);
                    break;
                }
                bs.flush().ok();
                last_activity = Instant::now();
                activity = true;
            }
            Err(ref e) if e.kind() == io::ErrorKind::WouldBlock => {}
            Err(ref e) if e.kind() == io::ErrorKind::TimedOut => {
                break;
            }
            Err(e) => {
                log_e!("handle_mitm: backend read error: {}", e);
                break;
            }
        }
        // Only sleep if no activity
        if !activity {
            thread::sleep(std::time::Duration::from_millis(5));
        }
    }
    log_d!("handle_mitm: relay done for {}", host);
    client.set_nonblocking(false).ok();
}

fn handle_client(mut client: TcpStream, cache: Arc<EchCache>, ca: Arc<MitmCa>) {
    let peer = client.peer_addr().map(|a| a.to_string()).unwrap_or_default();
    let client_clone = match client.try_clone() {
        Ok(c) => c,
        Err(e) => { log_e!("[{}] try_clone failed: {}", peer, e); return; },
    };
    let mut reader = BufReader::new(client_clone);
    let mut req_line = String::new();
    if reader.read_line(&mut req_line).is_err() || req_line.is_empty() {
        return;
    }
    let req_line = req_line.trim_end().to_string();
    let mut headers = Vec::new();
    loop {
        let mut l = String::new();
        if reader.read_line(&mut l).is_err() || l == "\r\n" || l.is_empty() {
            break;
        }
        headers.push(l.trim_end().to_string());
    }
    let method = req_line.split_whitespace().next().unwrap_or("");
    if method.eq_ignore_ascii_case("CONNECT") {
        let target = req_line.split_whitespace().nth(1).unwrap_or("");
        let (host, _) = target
            .rsplit_once(':')
            .map(|(h, p)| (h, p.parse().unwrap_or(443)))
            .unwrap_or((target, 443));
        log_d!("[{}] CONNECT {}", peer, host);
        handle_connect(&mut client, host, &cache, &ca);
    } else {
        let parts: Vec<&str> = req_line.split_whitespace().collect();
        let (method, uri) = (parts[0], parts[1]);
        let host = if uri.starts_with("http://") {
            uri[7..].split('/').next().unwrap_or("").split(':').next().unwrap_or("")
        } else {
            headers
                .iter()
                .find(|h| h.to_lowercase().starts_with("host:"))
                .and_then(|h| h.split(':').nth(1))
                .map(str::trim)
                .unwrap_or("")
        };
        let path = if uri.starts_with("http://") {
            match &uri[7..].find('/') {
                Some(i) => &uri[7 + i..],
                None => "/",
            }
        } else {
            uri
        };
        log_d!("[{}] {} {} (host={})", peer, method, path, host);

        // 跳过 localhost/127.0.0.1 请求 (Expo dev tools 等)
        if host == "localhost" || host == "127.0.0.1" {
            log_d!("[{}] skipping localhost request", peer);
            return;
        }

        // 跳过非 TARGETS 的域名
        if !is_target(host) {
            log_d!("[{}] skipping non-target host: {}", peer, host);
            return;
        }

        let cl: usize = headers
            .iter()
            .find(|h| h.to_lowercase().starts_with("content-length:"))
            .and_then(|h| h.split(':').nth(1))
            .and_then(|v| v.trim().parse().ok())
            .unwrap_or(0);
        let mut body = vec![0u8; cl];
        if cl > 0 {
            let _ = reader.read_exact(&mut body);
        }
        let mut backend = match open_backend(host, &cache) {
            Ok(s) => s,
            Err(e) => {
                log_e!("open_backend failed for {}: {}", host, e);
                return;
            }
        };
        let _ = backend.write_all(format!("{method} {path} HTTP/1.1\r\n").as_bytes());
        for h in &headers {
            let l = h.to_lowercase();
            if l.starts_with("proxy-connection:") || l.starts_with("proxy-authenticate:") {
                continue;
            }
            let _ = backend.write_all(format!("{h}\r\n").as_bytes());
        }
        let _ = backend.write_all(b"\r\n");
        if !body.is_empty() {
            let _ = backend.write_all(&body);
        }
        let _ = backend.flush();
        client.set_nonblocking(true).ok();
        backend.get_ref().set_nonblocking(true).ok();
        loop {
            let mut buf = [0u8; 8192];
            match client.read(&mut buf) {
                Ok(0) => break,
                Ok(n) => {
                    let _ = backend.write_all(&buf[..n]);
                    let _ = backend.flush();
                }
                Err(ref e) if e.kind() == io::ErrorKind::WouldBlock => {}
                Err(_) => break,
            }
            match backend.read(&mut buf) {
                Ok(0) => break,
                Ok(n) => {
                    let _ = client.write_all(&buf[..n]);
                    let _ = client.flush();
                }
                Err(ref e) if e.kind() == io::ErrorKind::WouldBlock => {}
                Err(_) => break,
            }
            thread::sleep(std::time::Duration::from_millis(1));
        }
        client.set_nonblocking(false).ok();
    }
}

// ============================= Proxy Server =================================

struct ProxyServer {
    port: u16,
    running: Arc<Mutex<bool>>,
    listener_handle: Option<std::thread::JoinHandle<()>>,
}

/// 最大并发连接数, 防止图片瀑布流打爆低端机
const MAX_CONCURRENT: u32 = 12;

static SERVER: Mutex<Option<ProxyServer>> = Mutex::new(None);
static CA_PEM: std::sync::OnceLock<String> = std::sync::OnceLock::new();

/// Per-host mutex: 串行化同一 host 的 MITM 操作, 防止 OpenSSL FFI 并发崩溃
static HOST_LOCKS: Mutex<Option<std::collections::HashMap<String, Arc<Mutex<()>>>>> = Mutex::new(None);

fn get_host_lock(host: &str) -> Arc<Mutex<()>> {
    let mut map = HOST_LOCKS.lock();
    let map = map.get_or_insert_with(std::collections::HashMap::new);
    map.entry(host.to_string())
        .or_insert_with(|| Arc::new(Mutex::new(())))
        .clone()
}

fn start_server(port: u16, dns: &str, ca_dir: &str, cache_dir: &str) -> u16 {
    log_d!("start_server: port={}, dns={}, ca_dir={}, cache_dir={}", port, dns, ca_dir, cache_dir);

    let addr = format!("127.0.0.1:{port}");
    let ca = match MitmCa::load_or_generate(ca_dir) {
        Ok(ca) => Arc::new(ca),
        Err(e) => {
            log_e!("Failed to load/generate CA: {}", e);
            return 0;
        }
    };
    let pem = ca.ca_cert.pem();
    log_d!("CA PEM length={}, first 80 chars: {}", pem.len(), &pem[..80.min(pem.len())]);
    let _ = CA_PEM.set(pem);
    let cache = Arc::new(EchCache::new(dns.to_string(), cache_dir.to_string()));
    let cache_clone = cache.clone();
    let running = Arc::new(Mutex::new(true));
    let running_clone = running.clone();

    let listener = match TcpListener::bind(&addr) {
        Ok(l) => {
            log_d!("Main listener bound to {}", addr);
            l
        }
        Err(e) => {
            log_e!("Failed to bind {}: {}", addr, e);
            return 0;
        }
    };
    let actual_port = listener.local_addr().unwrap().port();
    log_d!("Main proxy port: {}", actual_port);

    let active_count = Arc::new(Mutex::new(0u32));

    let handle = thread::spawn(move || {
        listener.set_nonblocking(true).ok();
        while *running_clone.lock() {
            // 检查并发数
            let current = *active_count.lock();
            if current >= MAX_CONCURRENT {
                thread::sleep(std::time::Duration::from_millis(20));
                continue;
            }

            match listener.accept() {
                Ok((client, _)) => {
                    *active_count.lock() += 1;
                    let (c, ca, ac) = (Arc::clone(&cache_clone), Arc::clone(&ca), Arc::clone(&active_count));
                    thread::spawn(move || {
                        let _ = std::panic::catch_unwind(std::panic::AssertUnwindSafe(|| {
                            handle_client(client, c, ca);
                        }));
                        *ac.lock() -= 1;
                    });
                }
                Err(ref e) if e.kind() == io::ErrorKind::WouldBlock => {
                    thread::sleep(std::time::Duration::from_millis(10));
                }
                Err(e) => {
                    log_e!("Main accept error: {}", e);
                    break;
                }
            }
        }
        log_d!("Main listener thread exiting");
    });

    *SERVER.lock() = Some(ProxyServer {
        port: actual_port,
        running,
        listener_handle: Some(handle),
    });

    // Pre-resolve all target domains at startup
    let cache_for_resolve = cache.clone();
    thread::spawn(move || {
        for host in TARGETS {
            if host == &"cloudflare-dns.com" {
                continue; // Skip DoH host
            }
            match cache_for_resolve.get_target_ips(host) {
                Ok(ips) => {
                    log_d!("Pre-resolved {host} -> {ips:?}");
                }
                Err(e) => {
                    let msg = format!("Pre-resolve failed for {host}: {e}");
                    log_e!("{}", msg);
                }
            }
        }
    });

    log_d!("Server started: proxy={}", actual_port);
    actual_port
}

fn stop_server() {
    if let Some(server) = SERVER.lock().take() {
        *server.running.lock() = false;
        // 等待 listener 线程退出
        if let Some(handle) = server.listener_handle {
            let _ = handle.join();
        }
        log_d!("Server stopped");
    }
}

fn get_status() -> (bool, u16) {
    match &*SERVER.lock() {
        Some(server) => (*server.running.lock(), server.port),
        None => (false, 0),
    }
}

// ============================= JNI ==========================================

#[allow(non_snake_case)]
pub mod android {
    use super::*;
    use jni::JNIEnv;
    use jni::objects::{JClass, JString};
    use jni::sys::{jint, jlong};

    #[no_mangle]
    pub extern "C" fn Java_com_czy0729_bangumi_doh_EchProxyNative_startProxy(
        mut env: JNIEnv,
        _class: JClass,
        port: jint,
        dns: JString,
        ca_dir: JString,
        cache_dir: JString,
    ) -> jint {
        let result = std::panic::catch_unwind(std::panic::AssertUnwindSafe(|| {
            let dns: String = env.get_string(&dns).unwrap().into();
            let ca_dir: String = env.get_string(&ca_dir).unwrap().into();
            let cache_dir: String = env.get_string(&cache_dir).unwrap().into();
            start_server(port as u16, &dns, &ca_dir, &cache_dir) as jint
        }));
        match result {
            Ok(port) => port,
            Err(e) => {
                log_e!("startProxy panicked: {:?}", e);
                0
            }
        }
    }

    #[no_mangle]
    pub extern "C" fn Java_com_czy0729_bangumi_doh_EchProxyNative_stopProxy(
        _env: JNIEnv,
        _class: JClass,
    ) {
        let _ = std::panic::catch_unwind(std::panic::AssertUnwindSafe(|| {
            stop_server();
        }));
    }

    #[no_mangle]
    pub extern "C" fn Java_com_czy0729_bangumi_doh_EchProxyNative_getCaPem<'local>(
        mut env: JNIEnv<'local>,
        _class: JClass<'local>,
    ) -> jni::objects::JString<'local> {
        let pem = CA_PEM.get().map(|s| s.as_str()).unwrap_or("");
        env.new_string(pem).unwrap()
    }
}
