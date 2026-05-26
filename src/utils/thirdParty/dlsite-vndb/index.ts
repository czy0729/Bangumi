/*
 * @Author: czy0729
 * @Date: 2026-05-24 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-27 06:01:18
 */
import { logger } from '../../dev'
import { axios } from '../index'
import { HOST_DLSITE, HOST_VNDB } from './ds'

import type { DlsiteImage, VndbScreenshot, VndbVnResult } from './types'
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
  while (padded.length < digits.length) padded = `0${padded}`
  return `${HOST_DLSITE}/modpub/images2/work/${
    prefix === 'RJ' ? 'doujin' : 'professional'
  }/${prefix}${padded}/${id}${suffix}`
}

/** 从 VNDB API 获取 VN 截图和平均游玩时长 */
export async function fetchVndbData(vndbId: string): Promise<{
  screenshots: VndbScreenshot[]
  lengthMinutes: number
} | null> {
  try {
    logger.purple('@utils/thirdParty/dlsite-vndb', 'fetchVndbData', { vndbId })
    const { data } = await axios<{ results: VndbVnResult[] }>({
      method: 'post',
      url: `${HOST_VNDB}/kana/vn`,
      headers: { 'Content-Type': 'application/json' },
      data: {
        filters: ['id', '=', vndbId],
        fields:
          'id,length_minutes,screenshots{id,url,dims,sexual,violence,thumbnail,thumbnail_dims}'
      }
    })

    const vn = data.results?.[0]
    if (!vn) return null

    return {
      screenshots: vn.screenshots || [],
      lengthMinutes: vn.length_minutes
    }
  } catch {
    return null
  }
}

/** 从 VNDB API 获取 VN 截图 */
export async function fetchVndbScreenshots(vndbId: string): Promise<VndbScreenshot[]> {
  const result = await fetchVndbData(vndbId)
  return result?.screenshots || []
}

/** 探测 DLsite 可用图片（使用 fetch HEAD 请求） */
export async function probeDlsiteImages(dlsiteId: string): Promise<DlsiteImage[]> {
  const images: DlsiteImage[] = []

  // 先尝试主图
  const mainUrl = buildDlsiteImageUrl(dlsiteId, '_img_main.webp')

  logger.purple('@utils/thirdParty/dlsite-vndb', 'probeDlsiteImages', { dlsiteId })
  if (!(await tryProbe(mainUrl))) return images
  images.push({ url: mainUrl })

  // 依次探测 sample 图片
  for (let n = 1; n <= 20; n++) {
    const smpaUrl = buildDlsiteImageUrl(dlsiteId, `_img_smpa${n}.webp`)
    if (await tryProbe(smpaUrl)) {
      images.push({ url: smpaUrl })
      continue
    }

    const smpUrl = buildDlsiteImageUrl(dlsiteId, `_img_smp${n}.webp`)
    if (await tryProbe(smpUrl)) {
      images.push({ url: smpUrl })
      continue
    }

    // 两种格式都不存在，停止探测
    break
  }

  return images
}

async function tryProbe(url: string): Promise<boolean> {
  try {
    const resp = await fetch(url, { method: 'HEAD' })
    return resp.ok
  } catch {
    return false
  }
}
