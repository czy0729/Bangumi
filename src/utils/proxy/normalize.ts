/*
 * @Author: czy0729
 * @Date: 2026-09-16 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 10:00:00
 *
 * lain 图片地址归一化
 *  - 背景: 历史版本会把"当时的"代理图片域名 (如已失效的旧节点) 连同签名一起写进本地持久化数据,
 *    换代理后该域名不再可用, 渲染时反复重试均以 SSL 错误失败
 *  - 策略: 旧域名只存在于用户本地、无法枚举, 故不维护域名黑名单, 改用「受信域名白名单 + /pic/ 路径特征」判定:
 *    任意非受信域名下、pathname 以 /pic/ 开头的图片地址一律还原为官方 //lain.bgm.tv 并移除节点签名
 *  - 还原后由 applyLainProxy 按当前生效节点重新改写与签名, 因此本函数自身不需要知道任何代理配置
 */
import { HOST_CDN_AVATAR, HOST_DOGE } from '@constants/cdn/ds'
import {
  HOST_2,
  HOST_3,
  HOST_CDN,
  HOST_IMAGE,
  HOST_IMAGE_UPLOAD,
  HOST_IMAGE_UPLOAD_RYMK,
  HOST_NAME,
  HOST_NETABA
} from '@constants/host'
import { getDomain, getPathname, removeSign, replaceDomain } from './url-utils'

/** lain 图床路径: 支持 /pic/... 与 /r/{size}/pic/...、/r/{W}x{H}/pic/... 两种形态 */
const LAIN_IMAGE_PATH = /^\/(?:r\/[^/]+\/)?pic\//

/**
 * 源码可见的受信域名关键词 (含官方图片域与各类既有图源)
 * - 这里用「子串」而非精确域名是有意为之:
 *   jsdelivr.net 需同时覆盖 cdn.jsdelivr.net 与历史图源 fastly.jsdelivr.net;
 *   hdslb.com / img.5t5 需覆盖各自子域 (无对应 @constants 常量,
 *   与 components/image/utils.ts 的 getDevStyles 判定保持一致)
 * - 不要改为「从常量取精确域名」: 会丢掉子域豁免, 反而漏配
 * - 反过来也不要无故放宽整个域: p.sda1.dev 已由 HOST_IMAGE_UPLOAD 精确覆盖,
 *   故不留 sda1.dev 关键词, 避免把整个 sda1.dev 域都纳入豁免
 */
const TRUSTED_HOST_KEYWORDS = [
  'lain.bgm.tv',
  'lain.bangumi.tv',
  'img.5t5',
  'hdslb.com',
  'jsdelivr.net'
]

/**
 * 运行时解密的域名常量, 路径同样形如 /pic/... 极易误伤, 必须纳入白名单
 *
 * 注意: @constants/cdn/ds 的 get() 在模块顶层执行, 而 crypto.get 内部是裸的
 * decrypt + JSON.parse (无 try/catch), 因此解密失败会直接在 import 阶段抛错 ——
 * 本文件内即使包 try/catch 也执行不到, 属无效补丁, 故刻意不加;
 * 且该模块早已经 @constants barrel 被 components/avatar/utils.ts 等引用, 风险面属既有全局设计,
 * 如需根治应改 crypto.get 或 @constants/cdn/ds, 不在本模块解决
 */
const TRUSTED_HOST_SOURCES = [
  HOST_CDN,
  HOST_CDN_AVATAR,
  HOST_DOGE,
  HOST_IMAGE_UPLOAD,
  HOST_IMAGE_UPLOAD_RYMK,
  HOST_NETABA,
  // 主站静态图: 历史数据里可能残留 bgm.tv / bangumi.tv / chii.in 形式的 /pic/ 地址,
  // 它们是官方域, 静默换域名不如原样保留
  HOST_2,
  HOST_3
]

/** 受信域名集合, 模块加载期算一次 */
const TRUSTED_DOMAINS = new Set(
  [
    // HOST_NAME 是裸域名 (无协议前缀), getDomain 解析不出, 单独并入
    String(HOST_NAME || '').toLowerCase(),
    ...TRUSTED_HOST_SOURCES.map(source => getDomain(source))
      .filter(Boolean)
      .map(domain => domain.toLowerCase())
  ].filter(Boolean)
)

/** 是否受信域名 (受信域名的图片地址不做任何改写) */
export function isTrustedImageDomain(domain: string): boolean {
  const lower = String(domain || '').toLowerCase()
  if (!lower) return false
  if (TRUSTED_DOMAINS.has(lower)) return true

  return TRUSTED_HOST_KEYWORDS.some(keyword => lower.includes(keyword))
}

/**
 * 归一化 lain 图片地址
 * - 命中: 非受信域名 + pathname 以 /pic/ 开头 → 域名还原为 //lain.bgm.tv (保留原协议) 并移除 v= 签名
 * - 未命中 / 非法入参: 原样返回, 不抛错
 *
 * 不做「当前生效节点域名豁免」: 子域豁免需要 getProxyStrategy (store + 解密 + ECH 判定),
 * 而本函数位于 match 解析热路径上, 引入该依赖既有循环风险也增加开销;
 * 且收益为零 —— 命中当前节点域名时, 归一化后 applyLainProxy 会用同一个 lainHost 换回,
 * 签名仅按 pathname 计算, 最终结果与不归一化完全一致
 */
export function normalizeLainImageUrl<T>(url: T): T | string {
  if (typeof url !== 'string' || !url) return url

  // 廉价短路: /pic/ 是 lain 图床的专有路径结构, 绝大多数图片 (CDN / 表情 / 本地图)
  // 在此一次 includes 即可返回, 无需再走 getDomain / 白名单查找 / pathname 的 replace 与 split
  if (!url.includes('/pic/')) return url

  const domain = getDomain(url)
  if (!domain || isTrustedImageDomain(domain)) return url
  if (!LAIN_IMAGE_PATH.test(getPathname(url))) return url

  // 保留原协议: 只有 http:// 与 https:// 才写回对应协议, 协议相对地址维持 //
  const scheme = /^https:/i.test(url) ? 'https:' : /^http:/i.test(url) ? 'http:' : ''

  return removeSign(replaceDomain(url, domain, `${scheme}${HOST_IMAGE}`))
}
