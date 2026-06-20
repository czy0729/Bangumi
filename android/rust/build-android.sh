#!/bin/bash
set -e

# ============================================================
# Bangumi ECH Proxy - Android 交叉编译脚本
#
# 用法:
#   ./build-android.sh          # 编译并复制到 jniLibs
#   ./build-android.sh --setup  # 仅安装工具链
# ============================================================

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
JNILIBS_DIR="$PROJECT_ROOT/android/app/src/main/jniLibs/arm64-v8a"
NDK_VERSION="27.1.12297006"
OPENSSL_VERSION="4.0.1"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() { echo -e "${GREEN}[build]${NC} $1"; }
warn() { echo -e "${YELLOW}[warn]${NC} $1"; }
err() { echo -e "${RED}[error]${NC} $1"; exit 1; }

# ============================================================
# 1. 检查/安装 Rust
# ============================================================
setup_rust() {
    if ! command -v rustc &>/dev/null; then
        log "安装 Rust..."
        curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
        source "$HOME/.cargo/env"
    fi

    log "Rust: $(rustc --version)"

    # 安装 Android 目标
    if ! rustup target list --installed | grep -q "aarch64-linux-android"; then
        log "安装 aarch64-linux-android 目标..."
        rustup target add aarch64-linux-android
    fi

    # 安装 cargo-ndk
    if ! command -v cargo-ndk &>/dev/null; then
        log "安装 cargo-ndk..."
        cargo install cargo-ndk
    fi

    log "Rust 工具链就绪"
}

# ============================================================
# 2. 设置 Android NDK 环境
# ============================================================
setup_ndk() {
    local ANDROID_HOME="${ANDROID_HOME:-$HOME/Library/Android/sdk}"
    local NDK_DIR="$ANDROID_HOME/ndk/$NDK_VERSION"

    if [ ! -d "$NDK_DIR" ]; then
        err "NDK $NDK_VERSION 未找到: $NDK_DIR"
    fi

    export ANDROID_NDK_HOME="$NDK_DIR"
    export ANDROID_NDK_ROOT="$NDK_DIR"

    # 添加 NDK 工具链到 PATH (用于编译 OpenSSL)
    local TOOLCHAIN="$NDK_DIR/toolchains/llvm/prebuilt/darwin-x86_64/bin"
    export PATH="$TOOLCHAIN:$PATH"

    log "NDK: $NDK_DIR"
}

# ============================================================
# 3. 交叉编译 OpenSSL (带 ECH 支持)
#
# 需要手动下载 OpenSSL 源码:
#   https://github.com/openssl/openssl/releases/download/openssl-4.0.1/openssl-4.0.1.tar.gz
#   解压到 android/rust/openssl/build/openssl-4.0.1/
# ============================================================
build_openssl() {
    local OPENSSL_DIR="$SCRIPT_DIR/openssl"
    local OPENSSL_BUILD="$OPENSSL_DIR/build"
    local OPENSSL_INSTALL="$OPENSSL_DIR/install"
    local OPENSSL_SRC="$OPENSSL_BUILD/openssl-$OPENSSL_VERSION"
    local ANDROID_HOME="${ANDROID_HOME:-$HOME/Library/Android/sdk}"
    local NDK_DIR="$ANDROID_HOME/ndk/$NDK_VERSION"
    local TOOLCHAIN="$NDK_DIR/toolchains/llvm/prebuilt/darwin-x86_64"
    local API_LEVEL=21

    if [ -f "$OPENSSL_INSTALL/lib/libssl.a" ]; then
        log "OpenSSL 已编译, 跳过"
        export OPENSSL_DIR="$OPENSSL_INSTALL"
        export OPENSSL_INCLUDE_DIR="$OPENSSL_INSTALL/include"
        export OPENSSL_LIB_DIR="$OPENSSL_INSTALL/lib"
        export OPENSSL_STATIC=1
        return
    fi

    # 检查源码是否存在, 不存在则询问是否下载
    if [ ! -d "$OPENSSL_SRC" ]; then
        warn "OpenSSL 源码未找到: $OPENSSL_SRC"
        echo ""
        echo "  下载地址: https://github.com/openssl/openssl/releases/download/openssl-$OPENSSL_VERSION/openssl-$OPENSSL_VERSION.tar.gz"
        echo "  目标目录: android/rust/openssl/build/openssl-$OPENSSL_VERSION/"
        echo ""
        read -p "  是否自动下载? (y/N) " -n 1 -r
        echo ""
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            mkdir -p "$OPENSSL_BUILD"
            log "下载 OpenSSL $OPENSSL_VERSION..."
            curl -L "https://github.com/openssl/openssl/releases/download/openssl-$OPENSSL_VERSION/openssl-$OPENSSL_VERSION.tar.gz" | tar xz -C "$OPENSSL_BUILD"
        else
            err "请手动下载并解压到上述目录后重新运行"
        fi
    fi

    log "编译 OpenSSL $OPENSSL_VERSION (带 ECH 支持)..."
    mkdir -p "$OPENSSL_INSTALL"

    cd "$OPENSSL_SRC"

    # 配置交叉编译
    ./Configure android-arm64 -D__ANDROID_API__=$API_LEVEL \
        --prefix="$OPENSSL_INSTALL" \
        --openssldir="$OPENSSL_INSTALL" \
        no-shared \
        no-tests \
        -static

    make -j$(sysctl -n hw.ncpu)
    make install_sw

    export OPENSSL_DIR="$OPENSSL_INSTALL"
    export OPENSSL_INCLUDE_DIR="$OPENSSL_INSTALL/include"
    export OPENSSL_LIB_DIR="$OPENSSL_INSTALL/lib"
    export OPENSSL_STATIC=1

    log "OpenSSL 编译完成"
}

# ============================================================
# 4. 交叉编译 Rust 库
# ============================================================
build_rust_lib() {
    cd "$SCRIPT_DIR"

    log "编译 ech-proxy (aarch64-linux-android)..."

    cargo ndk -t arm64-v8a --platform 21 build --release 2>&1

    # 复制产物到 jniLibs
    local SO_FILE="$SCRIPT_DIR/target/aarch64-linux-android/release/libechproxy.so"

    if [ -f "$SO_FILE" ]; then
        mkdir -p "$JNILIBS_DIR"
        cp "$SO_FILE" "$JNILIBS_DIR/"
        log "已复制到 $JNILIBS_DIR/libechproxy.so"
        log "大小: $(du -h "$JNILIBS_DIR/libechproxy.so" | cut -f1)"
    else
        err "编译产物未找到: $SO_FILE"
    fi
}

# ============================================================
# Main
# ============================================================
main() {
    log "=== Bangumi ECH Proxy 编译 ==="

    if [ "$1" = "--setup" ]; then
        setup_rust
        setup_ndk
        log "工具链安装完成"
        exit 0
    fi

    setup_rust
    setup_ndk
    build_openssl
    build_rust_lib

    log "=== 编译完成 ==="
    log ""
    log "产物: $JNILIBS_DIR/libechproxy.so"
    log ""
    log "下一步:"
    log "  1. 重新编译 Android App"
    log "  2. 在 JS 中调用 enableEchProxy()"
}

main "$@"
