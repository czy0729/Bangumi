/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-14 12:00:00
 *
 * 图片请求头: 被改写到主站节点的图片需额外携带鉴权头
 */
import { API_HOST, API_HOST_BACKUP } from '@constants/api'
import { getProxyStrategy } from './strategy'

/**
 * 依据原始图片地址返回内置换写后所需的请求头
 * - 图片节点 (lain) 靠地址上的 v= 签名鉴权, 不需要请求头
 * - 主站节点改写 (api.bgm.tv 的 redirect 图片) 需要 x-upstream 与密钥
 * - 改写目标与 lain.ts 逐字对齐: 支持者用内置主节点, 自建 Worker 用自填 API 域名;
 *   未填 API 域名时 lain.ts 并不会改写, 此时绝不能带密钥, 直接返回 {}
 */
export function getProxyImageHeaders(src: string): Record<string, string> {
  if (typeof src !== 'string' || !src) return {}

  const { disabled, ech, supporter, host, apiHost, secret, rewriteHeaders } = getProxyStrategy()

  // 直连 / ECH 原样返回; 仅替换地址的普通反代由反代方自行处理鉴权
  if (disabled || ech || !rewriteHeaders) return {}

  // 与 lain.ts 的改写目标一致 (支持者由内置主节点接管, apiHost 为空)
  const apiTarget = supporter ? host : apiHost
  if (!apiTarget) return {}
  if (!src.includes(API_HOST) && !src.includes(API_HOST_BACKUP)) return {}

  const headers: Record<string, string> = {
    'x-upstream': 'api.bgm.tv'
  }
  if (secret) headers['x-proxy-key'] = secret

  return headers
}
