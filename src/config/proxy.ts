/*
 * @Author: czy0729
 * @Date: 2026-09-06 16:49:41
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-06 16:49:41
 *
 * 代理配置
 */

/** ECH 代理功能总开关 (false 时彻底禁用, 含安卓); 功能本身默认关闭, 需在设置中手动开启 */
export const ECH_PROXY_ENABLED = true

/**
 * ECH 代理目标域名列表 (source of truth)
 * Java BangumiOkHttpClientFactory / Rust lib.rs 中的 target list 必须与此保持一致。
 * 变更时请同步更新:
 *   - android/app/.../BangumiOkHttpClientFactory.java TARGETS[]
 *   - android/app/.../DoHDNS.java TARGETS[]
 *   - android/rust/src/lib.rs TARGET_DOMAINS[]
 */
export const ECH_TARGET_DOMAINS = [
  'bgm.tv',
  'chii.in',
  'lain.bgm.tv',
  'next.bgm.tv',
  'api.bgm.tv',
  'cloudflare-dns.com'
] as const

/** 反代地址 */
export const HOST_PROXY = 'http://192.168.31.87:3000'
