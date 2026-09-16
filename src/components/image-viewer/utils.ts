/*
 * @Author: czy0729
 * @Date: 2026-08-14 19:28:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 18:26:31
 */
import { resolveImageUri } from '@utils/image'

import type { ImageUrl } from './types'

/** 图片列表地址统一套代理 (_url 常为原始地址, 由 resolveImageUri 一并补协议) */
export function getProxyImageUrls(imageUrls: ImageUrl[]): ImageUrl[] {
  return imageUrls.map(item => ({
    ...item,
    url: resolveImageUri(item.url),
    _url: item._url ? resolveImageUri(item._url) : item._url
  }))
}

/** 取当前图片地址, 优先备用地址 */
export function getCurrentUrl(imageUrls: ImageUrl[], index: number): string {
  return imageUrls[index]?._url || imageUrls[index]?.url || ''
}
