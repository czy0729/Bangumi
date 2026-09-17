/*
 * @Author: czy0729
 * @Date: 2022-08-03 11:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 07:15:58
 */
import { HOST_AC, HOST_AC_SEARCH } from '@constants/cdn'
import { xhrTimeout } from '../fetch'
import { t2s } from '../thirdParty/cn-char'
import { cheerio, htmlMatch } from '../thirdParty/html'
import { desc, similar } from '../utils'

import type { CheerioNode } from '../thirdParty/html/types'

/** 搜索结果标题相似度阈值 */
const SIMILAR_RATE = 0.7

/** 搜索结果最大返回条数 */
export const MAX_RESULTS = 7

/** 被风控后本次启动内不再请求 (无登录态请求搜索页会返回验证码页) */
let denied = false

/** 请求头: 固定 PC UA (带移动端标识的 UA 会被重定向到结构不同的页面) */
const HEADERS = {
  Referer: `${HOST_AC}/`,
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36'
}

/** 搜索页 */
const HTML_SEARCH = (q: string) => {
  return `${HOST_AC_SEARCH}/all?keyword=${q}`
}

/**
 * 视频搜索页地址
 *  - 类型后缀只有游戏会带 (isADV 为布尔值时才拼接), 其它类型只按标题搜索
 *  - 排序 / 时长 / 分区参数与既有入口保持一致
 * */
export function getVideoSearchUrl(title: string, isADV?: boolean) {
  const suffix = typeof isADV === 'boolean' ? `%20${isADV ? 'OP' : 'PV'}` : ''
  const keyword = encodeURIComponent(title)

  return `${HOST_AC_SEARCH}/all?keyword=${keyword}${suffix}&order=totalrank&duration=1&tids_1=4`
}

/** 去除部分干扰匹配的文字 */
const REG_FIXED =
  /ORIGINAL|SOUNDTRACK|SOUNDTRACKS|SOUND|TRACKS|TRACK|OST|CD|オリジナルサウンドトラック|剧场版|音乐集|游戏|原声集/g

/**
 * 关键字清洗: 这几个半角字符会让服务端直接返回空壳页面 (没有卡片也没有报错)
 *  - 全角形态不受影响, 只处理半角; 替换成空格以保留分词边界
 * */
const REG_REJECTED = /[!*']/g

/** 请求与过滤共用的关键字清洗 */
const cleanQuery = (q: string) => q.replace(REG_REJECTED, ' ')

/** 判断标题是否包含任一分割词 */
const includesAny = (title: string, splits: string[]) => splits.some(item => title.includes(item))

/** 搜索 */
export async function search(q: string, artist: string, filter?: string) {
  if (denied) return []

  let _q = q
  if (_q.length <= 10 && artist && artist.length <= 6) _q += ` ${artist}`
  _q = cleanQuery(_q)

  try {
    const { _response } = await xhrTimeout(HTML_SEARCH(encodeURIComponent(_q)), undefined, HEADERS)

    /** 命中验证码页: 认定被风控, 本次启动内不再尝试 */
    if (_response.includes('<title>验证码')) {
      denied = true
      return []
    }

    // 查询词标准化, 并预分割, 避免在过滤回调内重复处理
    //  - 过滤基准缺省为入参 q; 收窄搜索时请求词会带类型后缀, 调用方传 filter 保持按原词过滤
    const normalized = t2s(cleanQuery(filter || q))
      .toLocaleUpperCase()
      .replace(REG_FIXED, '')
      .trim()
    const slashSplits = normalized.includes('/') ? normalized.split('/') : null
    const fullwidthSplits = normalized.includes('／') ? normalized.split('／') : null

    const list = (
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
    ).map(item => {
      /** 过滤基准与请求词同一口径清洗, 避免标点形态不一致导致漏匹配 */
      const title = cleanQuery(item.title.toLocaleUpperCase()).replace(REG_FIXED, '').trim()
      return {
        item,
        title,
        rate: similar(title, normalized)
      }
    })

    /** 严格命中: 相似度达标 / 标题含整个查询词 / 命中任一分割词 */
    const matched = list.filter(({ title, rate }) => {
      if (rate >= SIMILAR_RATE || title.includes(normalized)) return true

      if (slashSplits && includesAny(title, slashSplits)) return true
      if (fullwidthSplits && includesAny(title, fullwidthSplits)) return true

      return false
    })
    if (matched.length >= MAX_RESULTS) return matched.slice(0, MAX_RESULTS).map(({ item }) => item)

    /** 不足返回上限: 剩余候选按相似度降序无条件补满 (宁可多补, 不再二次筛选) */
    const rest = list.filter(item => !matched.includes(item)).sort((a, b) => desc(a.rate, b.rate))

    return [...matched, ...rest].slice(0, MAX_RESULTS).map(({ item }) => item)
  } catch {}

  return []
}
