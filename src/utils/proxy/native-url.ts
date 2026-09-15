/*
 * @Author: czy0729
 * @Date: 2026-09-14 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 05:25:53
 *
 * 还原为 bgm 原生地址: 命中内置节点域名时替换域名, 用于无法携带密钥的出口
 */
import { getSupporterConfig } from '@utils/kv/worker'
import { HOST, HOST_IMAGE } from '@constants/host'
import { getDomain, removeSign, replaceDomain } from './url-utils'

/** 图片域 (补全协议) */
const HOST_IMAGE_URL = `https:${HOST_IMAGE}`

/**
 * 还原为 bgm 原生地址 (命中内置节点域名时替换为 bgm.tv / lain.bgm.tv)
 * - 只与内置节点域名精确比对 (不区分大小写), 用户自填地址与社区反代原样返回
 * - 图片地址上的签名参数一并移除
 * - 空值 / 非字符串 / 无域名 / 配置为空时均原样返回, 不抛错
 */
export function restoreNativeUrl(url: string): string {
  if (typeof url !== 'string' || !url) return url

  const domain = getDomain(url)
  if (!domain) return url

  const { host, lainHost } = getSupporterConfig()
  const lower = domain.toLowerCase()

  const hostDomain = getDomain(host)
  if (hostDomain && lower === hostDomain.toLowerCase()) {
    return replaceDomain(url, domain, HOST)
  }

  const lainDomain = getDomain(lainHost)
  if (lainDomain && lower === lainDomain.toLowerCase()) {
    return removeSign(replaceDomain(url, domain, HOST_IMAGE_URL))
  }

  return url
}
