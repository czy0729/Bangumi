/*
 * @Author: czy0729
 * @Date: 2026-08-14 19:28:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-20 04:47:19
 */
import { applyLainProxy } from '@utils/proxy'

import type { ImageUrl } from './types'

/** 图片列表地址统一套代理 */
export function getProxyImageUrls(imageUrls: ImageUrl[]): ImageUrl[] {
  return imageUrls.map(item => ({
    ...item,
    url: applyLainProxy(item.url),
    _url: item._url ? applyLainProxy(item._url) : item._url
  }))
}

/** 取当前图片地址, 优先备用地址 */
export function getCurrentUrl(imageUrls: ImageUrl[], index: number): string {
  return imageUrls[index]?._url || imageUrls[index]?.url || ''
}
