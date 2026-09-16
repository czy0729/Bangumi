/*
 * @Author: czy0729
 * @Date: 2026-09-16 05:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 21:00:00
 *
 * 远程图片地址统一处理: 判定是否远程地址 / 归一化历史代理域名 / 补全协议 / 计算最终请求地址
 *
 * 地址解析顺序固定为三步 (不可调换):
 *  1) normalizeLainImageUrl: 旧代理域名 (含已失效节点) 还原为官方 //lain.bgm.tv, 会保留原协议
 *  2) fixImageProtocol: 补协议 (协议相对补 https, lain 系图床的 http 升级 https)
 *  3) applyLainProxy: 按当前生效节点改写域名并附签名
 * 因为第 1 步会保留原协议, 补协议必须排在第 2 步 (归一化之后), 否则
 * `http://旧节点域/pic/...` 会被原样保留成 http 请求地址 (iOS ATS 直接白图)
 *
 * 与 @utils/app/cover 的 fixedRemoteImageUrl 不要混用 (两者语义不同):
 *  - fixedRemoteImageUrl 是「封面地址规范化」: 全局把 http:// 升级 https, 且命中 /r/{n}/ 时
 *    会把首个 g|s|m|c 质量段改写成 l (换更大图), 服务封面质量选择链路
 *  - 本模块是「渲染 / 测量地址」: 不做质量改写, 不对非 lain 域强制 https (证书不匹配会白图)
 *
 * 渲染地址与宽高测量地址必须走同一函数, 否则代理 (支持者节点 / 自建节点) 开启后
 * 会出现「图片能渲染但 getSize 失败」的假性加载错误
 */
import { applyLainProxy, normalizeLainImageUrl } from '../proxy'

/**
 * lain 系图片域的 http 地址
 * 与 proxy/normalize 的受信图源保持一致: lain.bgm.tv 与 lain.bangumi.tv 是同一图床的两个域,
 * 只覆盖前者会让 http://lain.bangumi.tv 的图在 iOS (ATS) 被拦
 * */
const LAIN_HTTP = /^http:\/\/lain\.(?:bgm|bangumi)\.tv(?:\/|$)/i

/**
 * 是否远程图片地址
 *  - 协议相对 (`//lain.bgm.tv/xxx`) 与 `http(s)://` 为远程
 *  - 本地与相对地址 (`file://` `content://` `data:` `blob:` `./xxx`) 与 require 资源均不是
 *  - 判据必须要求 `http(s)://`, 否则 `https:/a.png` `https:./a.png` 这类畸形地址会被当成远程,
 *    再被补协议逻辑二次前缀成 `https:https:/a.png` (函数不再幂等)
 * */
export function isRemoteImageUrl(uri: unknown): uri is string {
  if (typeof uri !== 'string' || !uri) return false

  if (uri.startsWith('//')) return uri.length > 2

  return /^https?:\/\//i.test(uri)
}

/**
 * 补全图片地址协议 (与 Image 组件渲染语义一致)
 *  - 协议相对地址补 `https:`
 *  - 仅 lain 系图床 (`lain.bgm.tv` / `lain.bangumi.tv`) 的 `http://` 升级为 `https://`;
 *    其他域名的 http 保持原样 (强制 https 遇证书不匹配会白图)
 *  - 本地 / 相对地址 / 非字符串原样返回 (不拼 `https:`, 否则 `file:///` 会被破坏)
 *  - 注意: 只认官方 lain 域, 历史旧代理域名请先过 getDirectImageUri (内部会归一化)
 * */
export function fixImageProtocol<T>(uri: T): T
export function fixImageProtocol(uri: unknown) {
  if (typeof uri !== 'string' || !uri) return uri

  if (uri.startsWith('//')) return `https:${uri}`
  if (LAIN_HTTP.test(uri)) return uri.replace(/^http:\/\//i, 'https://')

  return uri
}

/**
 * 计算「不含节点改写」的直连可用地址 (归一化历史代理域名 + 补协议)
 *  - 用于代理回退、本地缓存键等需要与当前节点无关的场景
 *  - 非字符串 / 空值 / 非远程地址原样返回
 * */
export function getDirectImageUri<T>(uri: T): T
export function getDirectImageUri(uri: unknown) {
  if (!isRemoteImageUrl(uri)) return uri

  return fixImageProtocol(normalizeLainImageUrl(uri))
}

/**
 * 计算图片最终请求地址 (渲染、宽高测量、体积探测、本地缓存失效等多处复用)
 *  - 非字符串 / 空值 / 非远程地址原样返回
 *  - 先归一化历史代理域名并补协议, 再交给图片代理 (顺序见文件头说明)
 * */
export function resolveImageUri<T>(uri: T): T
export function resolveImageUri(uri: unknown) {
  if (!isRemoteImageUrl(uri)) return uri

  return applyLainProxy(getDirectImageUri(uri))
}
