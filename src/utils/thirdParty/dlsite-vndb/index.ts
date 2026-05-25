/*
 * @Author: czy0729
 * @Date: 2026-05-24 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-25 06:58:22
 */
import { axios } from '../index'

import type { DlsiteImage, VndbScreenshot } from './types'
export type { DlsiteImage, VndbScreenshot }

/** 从 infobox HTML 中提取 VNDB ID */
export function extractVndbId(rawInfo: string): string | null {
  const m = (rawInfo || '').match(/vndb\.org\/(v\d+)/)
  return m ? m[1] : null
}

/** 从 infobox HTML 中提取 DLsite ID */
export function extractDlsiteId(rawInfo: string): string | null {
  const m = (rawInfo || '').match(/product_id\/((?:RJ|VJ)\d+)/)
  return m ? m[1] : null
}

/** 判断截图是否为 NSFW 内容 */
export function isNsfwScreenshot(s: { sexual: number; violence: number }): boolean {
  return s.sexual >= 2 || s.violence >= 2
}

/** 构造 DLsite 图片 URL */
export function buildDlsiteImageUrl(id: string, suffix: string): string {
  const prefix = id.slice(0, 2)
  const digits = id.slice(2)
  const folderNum = Math.ceil(parseInt(digits, 10) / 1000) * 1000
  let padded = String(folderNum)
  while (padded.length < digits.length) padded = '0' + padded
  return (
    'https://img.dlsite.jp/modpub/images2/work/' +
    (prefix === 'RJ' ? 'doujin' : 'professional') +
    '/' +
    prefix +
    padded +
    '/' +
    id +
    suffix
  )
}

/** 从 VNDB API 获取 VN 截图 */
export async function fetchVndbScreenshots(vndbId: string): Promise<VndbScreenshot[]> {
  try {
    const { data } = await axios<{ results: { screenshots: VndbScreenshot[] }[] }>({
      method: 'post',
      url: 'https://api.vndb.org/kana/vn',
      headers: { 'Content-Type': 'application/json' },
      data: {
        filters: ['id', '=', vndbId],
        fields: 'id,screenshots{id,url,dims,sexual,violence,thumbnail,thumbnail_dims}'
      }
    })

    const vn = data.results?.[0]
    return vn?.screenshots || []
  } catch {
    return []
  }
}

/** 探测 DLsite 可用图片（使用 fetch HEAD 请求） */
export async function probeDlsiteImages(dlsiteId: string): Promise<DlsiteImage[]> {
  const images: DlsiteImage[] = []

  async function tryProbe(url: string): Promise<boolean> {
    try {
      const resp = await fetch(url, { method: 'HEAD' })
      return resp.ok
    } catch {
      return false
    }
  }

  // 先尝试主图
  const mainUrl = buildDlsiteImageUrl(dlsiteId, '_img_main.webp')
  if (!(await tryProbe(mainUrl))) return images
  images.push({ url: mainUrl })

  // 依次探测 sample 图片
  for (let n = 1; n <= 20; n++) {
    const smpaUrl = buildDlsiteImageUrl(dlsiteId, '_img_smpa' + n + '.webp')
    if (await tryProbe(smpaUrl)) {
      images.push({ url: smpaUrl })
      continue
    }

    const smpUrl = buildDlsiteImageUrl(dlsiteId, '_img_smp' + n + '.webp')
    if (await tryProbe(smpUrl)) {
      images.push({ url: smpUrl })
      continue
    }

    // 两种格式都不存在，停止探测
    break
  }

  return images
}
