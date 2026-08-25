/*
 * @Author: czy0729
 * @Date: 2026-05-24 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 22:08:56
 */
import { logger } from '../../dev'
import { axios } from '../index'
import { HOST_DLSITE, HOST_VNDB, MAX_SAMPLE_COUNT, PROBE_BATCH_SIZE } from './ds'

import type { DlsiteImage, VndbScreenshot, VndbVnResult } from './types'
export type { DlsiteImage, VndbScreenshot }

/** 日志标签 */
const TAG = '@utils/thirdParty/dlsite-vndb'

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
    logger.info(TAG, 'fetchVndbData', { vndbId })
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
      lengthMinutes: vn.length_minutes || 0
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

/** 单组 sample 的成对探测结果 */
type SamplePairResult = {
  ok: boolean
  url: string
}

/** 会话级探测缓存: 并发去重 + 负结果复用 (跨天缓存由上层 KV 负责) */
const probeCache = new Map<string, Promise<DlsiteImage[]>>()

/**
 * 探测 DLsite 可用图片 (HEAD 请求)
 * 主图先行; sample 按 PROBE_BATCH_SIZE 分批并发, 批内 smpa/smp 成对并行,
 * 收录按 n 升序且遇首个双缺失即停, 输出与旧串行实现完全一致
 */
export function probeDlsiteImages(dlsiteId: string): Promise<DlsiteImage[]> {
  let pending = probeCache.get(dlsiteId)
  if (!pending) {
    pending = doProbeDlsiteImages(dlsiteId)
    probeCache.set(dlsiteId, pending)
    // 失败不缓存失败态, 允许下次重新探测
    pending.catch(() => probeCache.delete(dlsiteId))
  }

  return pending
}

async function doProbeDlsiteImages(dlsiteId: string): Promise<DlsiteImage[]> {
  const images: DlsiteImage[] = []

  // 先尝试主图
  const mainUrl = buildDlsiteImageUrl(dlsiteId, '_img_main.webp')

  logger.info(TAG, 'probeDlsiteImages', { dlsiteId })
  if (!(await tryProbe(mainUrl))) return images
  images.push({ url: mainUrl })

  // 分批并发探测 sample 图片
  for (let start = 1; start <= MAX_SAMPLE_COUNT; start += PROBE_BATCH_SIZE) {
    const end = Math.min(start + PROBE_BATCH_SIZE - 1, MAX_SAMPLE_COUNT)

    const tasks: Promise<SamplePairResult>[] = []
    for (let n = start; n <= end; n++) {
      tasks.push(probeSamplePair(dlsiteId, n))
    }
    const batchResults = await Promise.all(tasks)

    // 按序收录, 遇到双缺失即停止 (批内已发出的后续请求结果丢弃)
    for (let i = 0; i < batchResults.length; i++) {
      const result = batchResults[i]
      if (!result.ok) return images

      images.push({ url: result.url })
    }
  }

  return images
}

/** 成对探测一组 sample, smpa 优先于 smp */
async function probeSamplePair(dlsiteId: string, n: number): Promise<SamplePairResult> {
  const smpaUrl = buildDlsiteImageUrl(dlsiteId, `_img_smpa${n}.webp`)
  if (await tryProbe(smpaUrl)) return { ok: true, url: smpaUrl }

  const smpUrl = buildDlsiteImageUrl(dlsiteId, `_img_smp${n}.webp`)
  if (await tryProbe(smpUrl)) return { ok: true, url: smpUrl }

  return { ok: false, url: '' }
}

async function tryProbe(url: string): Promise<boolean> {
  try {
    const resp = await fetch(url, { method: 'HEAD' })
    return resp.ok
  } catch {
    return false
  }
}
