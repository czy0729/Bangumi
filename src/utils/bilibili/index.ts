/*
 * @Author: czy0729
 * @Date: 2022-08-03 11:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-17 05:32:21
 */
import { HOST_AC_SEARCH } from '@constants/cdn'
import { xhrCustom } from '../fetch'
import { t2s } from '../thirdParty/cn-char'
import { cheerio, htmlMatch } from '../thirdParty/html'
import { similar } from '../utils'

import type { CheerioNode } from '../thirdParty/html/types'

/** 搜索结果标题相似度阈值 */
const SIMILAR_RATE = 0.7

/** 搜索结果最大返回条数 */
const MAX_RESULTS = 7

/** 搜索页 */
const HTML_SEARCH = (q: string) => {
  return `${HOST_AC_SEARCH}/all?keyword=${q}`
}

/** 去除部分干扰匹配的文字 */
const REG_FIXED =
  /ORIGINAL|SOUNDTRACK|SOUNDTRACKS|SOUND|TRACKS|TRACK|OST|CD|オリジナルサウンドトラック|剧场版|音乐集|游戏|原声集/g

/** 判断标题是否包含任一分割词 */
const includesAny = (title: string, splits: string[]) => splits.some(item => title.includes(item))

/** 搜索 */
export async function search(q: string, artist: string) {
  let _q = q
  if (_q.length <= 10 && artist && artist.length <= 6) _q += ` ${artist}`

  const { _response } = await xhrCustom({
    url: HTML_SEARCH(encodeURIComponent(_q))
  })

  try {
    // 查询词标准化, 并预分割, 避免在过滤回调内重复处理
    const normalized = t2s(q.toLocaleUpperCase()).replace(REG_FIXED, '').trim()
    const slashSplits = normalized.includes('/') ? normalized.split('/') : null
    const fullwidthSplits = normalized.includes('／') ? normalized.split('／') : null

    return (
      cheerio(htmlMatch(_response, '<div class="search-content', '<div id="biliMainFooter"'))(
        '.bili-video-card'
      )
        .map((_index: number, element: CheerioNode) => {
          const $row = cheerio(element)
          return {
            result_type: 'video',
            title: $row.find('h3').text().trim(),
            cover: `https:${$row.find('picture img').attr('src') || ''}`,
            href: `https:${$row.find('a').attr('href') || ''}`
          }
        })
        .get() as {
        result_type: 'video'
        title: string
        cover: string
        href: string
      }[]
    )
      .filter(item => {
        const title = item.title.toLocaleUpperCase().replace(REG_FIXED, '').trim()
        if (similar(title, normalized) >= SIMILAR_RATE || title.includes(normalized)) return true

        if (slashSplits && includesAny(title, slashSplits)) return true
        if (fullwidthSplits && includesAny(title, fullwidthSplits)) return true

        return false
      })
      .slice(0, MAX_RESULTS)
  } catch {}

  return []
}
