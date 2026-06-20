# ECH Proxy - Android Native Module

本地 HTTPS CONNECT 代理，通过 ECH (Encrypted Client Hello) + DoH 绕过 SNI 封锁。

## 架构

```
JS (enableEchProxy)
  → Java EchProxyModule (NativeModule)
    → JNI EchProxyNative
      → Rust libechproxy.so
        ├── 本地 HTTP CONNECT 代理
        ├── ECH TLS 后端 (OpenSSL 4.0.1 + ech.h)
        ├── MITM: 自签 CA → per-host 证书 → rustls
        └── DoH DNS 解析
```

## 依赖

| 依赖        | 版本          | 说明                            |
| ----------- | ------------- | ------------------------------- |
| Rust        | stable        | 交叉编译 aarch64-linux-android  |
| cargo-ndk   | latest        | Android NDK 集成                |
| OpenSSL     | 4.0.1         | 需要 ECH 支持 (`openssl/ech.h`) |
| Android NDK | 27.1.12297006 | 在 `build-android.sh` 中配置    |

## 构建

### 1. 编译

```bash
npm run build:rust
# 或
bash android/rust/build-android.sh
```

脚本会自动检查 OpenSSL 源码是否存在：
- **已存在** → 直接编译
- **不存在** → 询问是否自动下载，或手动下载到 `android/rust/openssl/build/openssl-4.0.1/`

手动下载地址：
```
https://github.com/openssl/openssl/releases/download/openssl-4.0.1/openssl-4.0.1.tar.gz
```

目录结构：
```
android/rust/openssl/
  build/
    openssl-4.0.1/    ← 源码 (自动下载或手动放置)
  install/            ← 编译产物 (自动生成)
```

### 构建流程

1. 检查/安装 Rust + `aarch64-linux-android` target + cargo-ndk
2. 设置 Android NDK 环境变量
3. 交叉编译 OpenSSL (带 ECH 支持，静态链接，已编译则跳过)
4. `cargo ndk` 编译 `libechproxy.so`
5. 复制到 `android/app/src/main/jniLibs/arm64-v8a/`

### 构建产物

| 产物             | 路径                                         |
| ---------------- | -------------------------------------------- |
| `libechproxy.so` | `android/app/src/main/jniLibs/arm64-v8a/`    |
| OpenSSL 静态库   | `android/rust/openssl/install/` (gitignored) |
| Cargo target     | `android/rust/target/` (gitignored)          |

## 源码

| 文件           | 作用                                      |
| -------------- | ----------------------------------------- |
| `src/lib.rs`   | 代理主逻辑、JNI 入口、ECH 后端、MITM、DNS |
| `ech_helper.c` | OpenSSL ECH GREASE retry-config 获取      |
| `build.rs`     | 编译期探测 `openssl/ech.h`                |
| `Cargo.toml`   | Rust 依赖配置                             |

## 注意事项

- 首次构建时脚本会询问是否自动下载 OpenSSL 源码，也可手动下载
- 仅支持 Android arm64-v8a
- OpenSSL 必须有 ECH 支持 (`ech.h`)，否则编译为 `no_ech` 版本，ECH 功能不可用
- `libechproxy.so` 和 `openssl/` 目录均被 `.gitignore` 忽略，需要本地编译
- 构建需要 macOS (当前 `build-android.sh` 使用 `darwin-x86_64` 工具链)
