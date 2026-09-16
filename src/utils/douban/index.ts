/*
 * @Author: czy0729
 * @Date: 2022-06-21 23:43:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-17 06:09:14
 */
import { HOST_AC_REFERER, HOST_DB, HOST_DB_M, HOST_DB_MOVIE } from '@constants/cdn'
import { logger } from '../dev'
import { xhrTimeout } from '../fetch'
import { cheerio } from '../thirdParty/html'
import { desc, similar, sleep } from '../utils'
import DOUBAN_MAP from './map.json'
import { getSeason, hasSeasonConflict } from './season'

import type { Cat, DoubanId, SearchItem, SubType, TrailerItem, VideoItem } from './types'

/** 手动映射表 (bgmId → doubanId) */
const MANUAL_MAP: Record<string, string> = DOUBAN_MAP

/**
 * 获取手动映射的条目 id (命中则跳过搜索与匹配)
 * @param subjectId bgm 条目 id
 * */
export function getManualDoubanId(subjectId: string | number): DoubanId {
  return MANUAL_MAP[String(subjectId)] || false
}

/** 搜索页 */
const HTML_SEARCH = (q: string, cat?: Cat) => {
  let _cat: number
  if (cat === 'game') {
    _cat = 3114
  } else {
    _cat = 1002
  }

  return `${HOST_DB}/search?cat=${_cat}&q=${q}`
}

/** 条目页 */
const HTML_SUBJECT = (doubanId: DoubanId) => {
  return `${HOST_DB_MOVIE}/subject/${doubanId}`
}

/** 预览页 */
const HTML_PREVIEW = (doubanId: DoubanId, cat?: Cat, subtype: SubType = 'o', start = 0) => {
  if (cat === 'game') {
    return `${HOST_DB}/game/${doubanId}/photos/?type=1&start=0&sortby=hot`
  }

  if (subtype === 'R') {
    return `${HTML_SUBJECT(doubanId)}/photos?type=R`
  }

  return `${HTML_SUBJECT(
    doubanId
  )}/photos?type=S&start=${start}&sortby=time&size=a&subtype=${subtype}`
}

/** 移动端预览接口 (网页版剧照页被风控拦截时的取图通路) */
const JSON_PREVIEW = (doubanId: DoubanId, start: number = 0, count: number = 12) => {
  return `${HOST_DB_M}/rexxar/api/v2/movie/${doubanId}/photos?count=${count}&start=${start}&ck=PylB&for_mobile=1`
}

/** 用户视频页 */
const HTML_VIDEOS = (doubanId: DoubanId, cat: Cat = 'subject') => {
  return `${HOST_DB}/${cat}/${doubanId}/videos`
}

/** 视频预告页 */
const HTML_TRAILER = (doubanId: DoubanId) => {
  return `${HOST_DB_MOVIE}/subject/${doubanId}/trailer`
}

/**
 * 搜索
 * @param q
 * @param cat
 */
export async function search(q: string, cat?: Cat): Promise<SearchItem[]> {
  try {
    const { _response } = await xhrTimeout(HTML_SEARCH(q, cat))
    const $ = cheerio(_response)

    return (
      $('.result .content')
        .map((_index: number, element) => {
          const $row = cheerio(element)
          const $a = $row.find('h3 a')
          const cast = removeSpecial($row.find('.subject-cast').text().trim()) || ''
          return {
            id: $a.attr('onclick').match(/sid: (\d+)/)?.[1],
            title: removeSpecial($a.text().trim()),
            name: cast.match(/原名:(.*?)\s\/\s/)?.[1] || '',
            desc: removeSpecial($row.find('p').text().trim()),
            year: cast.match(/(\d{4})$/)?.[1] || '',
            index: _index
          }
        })
        .get() || []
    )
      .filter((item: SearchItem) => item.id)
      .sort((a: SearchItem, b: SearchItem) => desc(similar(q, a.title), similar(q, b.title)))
  } catch (error) {
    return []
  }
}

/**
 * 匹配影视结果
 * @param q
 * @param result
 */
export function matchMovie(q: string, result: SearchItem[], jp?: string, year?: string): DoubanId {
  const SIMILAR_RATE = 0.7
  const SIMILAR_RATE_MAX = 0.86
  const _q = removeSpecial(q)
  const _jp = jp ? removeSpecial(jp) : ''
  const target = _jp || _q

  /** 查询词的续作编号, 0 表示无法识别 */
  const season = getSeason(_q)

  /** 候选的续作编号 (标题优先, 其次原名) */
  const itemSeason = (item: SearchItem) => getSeason(item.title) || getSeason(item.name)

  /** 季数明确冲突的候选直接跳过 (第三季不应被第二季抢走) */
  const conflicted = (item: SearchItem) => hasSeasonConflict(season, itemSeason(item))

  let doubanId: DoubanId = false

  /**
   * 续作编号一致优先
   * - 续作之间只差一个罗马数字, 相似度高达 0.95, 原有策略无法区分
   * - 年份只用于优先, 不作为硬性条件: 年份可能缺失, 也可能被条目 info 解析错
   * */
  if (season) {
    result.forEach(item => {
      if (doubanId) return
      if (itemSeason(item) !== season) return
      if (year && item.year && year != item.year) return

      doubanId = item.id
    })

    if (!doubanId) {
      result.forEach(item => {
        if (doubanId) return
        if (itemSeason(item) === season) doubanId = item.id
      })
    }
  }

  // 原名最优先 (search 解析出的 name 已归一化, jp 需要同样处理后比较)
  result.forEach(item => {
    if (doubanId) return
    if (conflicted(item)) return
    if (year && item.year && year != item.year) return
    if (_jp && item.name && removeSpecial(item.name) === _jp) doubanId = item.id
  })

  // 必须命中年份, 然后匹配原名相似度
  result.forEach(item => {
    if (doubanId) return
    if (conflicted(item)) return
    if (
      year &&
      item.year &&
      item.year == year &&
      item.name &&
      _jp &&
      similar(removeSpecial(item.name), _jp) >= SIMILAR_RATE
    ) {
      doubanId = item.id
    }
  })

  /** 标题相似但年份冲突的候选, 降级留作兜底 (年份可能被解析错位) */
  const fallback: SearchItem[] = []

  // 标题相似度 (标题不像时, 用归一化后的原名再判断一次)
  result.forEach(item => {
    if (doubanId) return
    if (conflicted(item)) return
    if (similar(item.title, _q) < SIMILAR_RATE) {
      if (!item.name) return
      if (year && item.year && year != item.year) return
      if (similar(removeSpecial(item.name), target) < SIMILAR_RATE) return
    } else if (year && item.year && year != item.year) {
      // 标题像但年份明确不符: 不抢占, 留到最后兜底
      fallback.push(item)
      return
    }

    doubanId = item.id
  })

  // 进一步放宽 (不比较年份)
  result.forEach(item => {
    if (doubanId) return
    if (conflicted(item)) return
    // 已因年份冲突降级的候选不在此处抢占, 只留给最终兜底
    if (fallback.includes(item)) return
    if (similar(removeSpecial(item.name || ''), _q) < SIMILAR_RATE_MAX) return

    doubanId = item.id
  })

  /**
   * 最终兜底: 相似度策略全部未命中时, 信任搜索接口的相关性排序
   *  - 接口第一条最相关, 但 search() 已按标题相似度重排, 故用 index 还原原始顺序
   *  - 仅在有 year 时启用, 避免年份未知时乱命中
   * */
  if (!doubanId && year) {
    const byIndex = (a: SearchItem, b: SearchItem) =>
      (a.index ?? Number.MAX_SAFE_INTEGER) - (b.index ?? Number.MAX_SAFE_INTEGER)

    /** 1) 年份一致 + 接口顺序最靠前 */
    doubanId =
      result.filter(item => !conflicted(item) && item.year == year).sort(byIndex)[0]?.id || false

    /** 2) 年份一致的都没有, 回退到标题相似但年份冲突的备用候选 */
    if (!doubanId) doubanId = fallback.sort(byIndex)[0]?.id || false
  }

  return doubanId
}

/**
 * 匹配游戏结果
 * @param q
 * @param result
 */
export function matchGame(q: string, result: SearchItem[]): DoubanId {
  const SIMILAR_RATE = 0.7
  const _q = removeSpecial(q)
  let doubanId: DoubanId = false

  // 先匹配标题
  result.forEach(item => {
    if (doubanId) return
    if (similar(item.title, _q) < SIMILAR_RATE) {
      // 接受字符串包含认为是找到的情况
      if (!item.title.includes(_q)) return
    }
    doubanId = item.id
  })

  // 标题没匹配后匹配详情
  result.forEach(item => {
    if (doubanId) return
    if (!item.desc.includes(_q)) return
    doubanId = item.id
  })

  return doubanId
}

/** 移动端取图超时阈值 (该接口响应很快, 超时即视为异常) */
const MOBILE_TIMEOUT = 4000

/** 取图整体超时阈值 */
const PREVIEW_TOTAL_TIMEOUT = 12000

/** 取图链路逐层诊断 (仅 DEV, 定位完可整块移除) */
function logPreviewTrace(doubanId: DoubanId, payload: Record<string, unknown>) {
  logger.info('@utils/douban', 'previewTrace', { id: String(doubanId), ...payload })
}

/**
 * 移动端取图通路
 *  - 网页版剧照页在无 cookie 时只返回空壳页面, 解析结果恒为空
 *  - 任何异常、超时或无数据都返回空数组, 交由网页版流程兜底
 * */
async function getPreviewFromMobile(doubanId: DoubanId, maxCount: number): Promise<string[]> {
  try {
    /**
     * 该接口为「较早在前」, 取列表头部即时间上较早的一批, 避开最新剧照以免剧透
     * @note 与网页版的排序方向相反, 因此不套用网页版的区间公式
     * */
    const { _response } = await xhrTimeout(JSON_PREVIEW(doubanId, 0, maxCount), MOBILE_TIMEOUT, {
      Referer: HOST_DB_M
    })
    const { photos = [] } = JSON.parse(_response) as {
      photos?: { image?: { normal?: { url?: string } } }[]
    }

    /** 反转为「新 → 旧」, 与网页版返回口径一致 (消费方会再反转成展示顺序) */
    const data = photos
      .map(item => item.image?.normal?.url?.replace('http://', 'https://') || '')
      .filter(Boolean)
      .filter((_item, index) => index < maxCount)
      .reverse()

    logPreviewTrace(doubanId, {
      step: 'mobile',
      response: String(_response || '').length,
      photos: photos.length,
      data: data.length
    })

    return data
  } catch (error) {
    /** 超时 / 非 JSON 响应 / 接口报错都会走到这里, 且被吞成空数组 */
    logPreviewTrace(doubanId, {
      step: 'mobile',
      fail: String(error)
    })

    return []
  }
}

/** 同 id 进行中的取图 (重复调用复用同一请求, 避免总超时后堆积) */
const previewing = new Map<string, Promise<{ data: string[]; referer: string }>>()

/**
 * 获取条目图片 (外层兜总超时, 防网页版多次请求叠加)
 * @param doubanId
 * @param maxCount
 */
export async function getPreview(
  doubanId: DoubanId,
  cat?: Cat,
  maxCount: number = 12
): Promise<{
  data: string[]
  referer: string
}> {
  if (!doubanId) {
    return {
      data: [],
      referer: ''
    }
  }

  const referer = HTML_SUBJECT(doubanId)

  /** 同 id 进行中的取图: 重复调用复用同一请求, 总超时后也不会重复堆积 */
  const key = `${doubanId}|${cat || ''}|${maxCount}`
  let task = previewing.get(key)
  if (!task) {
    task = getPreviewCore(doubanId, cat, maxCount, referer)
    previewing.set(key, task)

    const done = () => previewing.delete(key)
    task.then(done, done)
  }

  let timer: ReturnType<typeof setTimeout> | undefined

  return Promise.race([
    task,
    new Promise<{ data: string[]; referer: string }>(resolve => {
      timer = setTimeout(() => {
        logPreviewTrace(doubanId, { step: 'total-timeout' })
        resolve({ data: [], referer })
      }, PREVIEW_TOTAL_TIMEOUT)
    })
  ]).finally(() => clearTimeout(timer))
}

/** 取图主流程 */
async function getPreviewCore(
  doubanId: DoubanId,
  cat: Cat | undefined,
  maxCount: number,
  referer: string
): Promise<{
  data: string[]
  referer: string
}> {
  const isGame = cat === 'game'

  /** 网页版剧照页在无 cookie 时只返回空壳页面, 解析结果恒为空, 优先尝试移动端通路 */
  if (!isGame) {
    const mobileData = await getPreviewFromMobile(doubanId, maxCount)
    logPreviewTrace(doubanId, { step: 'mobile-result', data: mobileData.length })
    if (mobileData.length) return { data: mobileData, referer }
  }

  let _response: string

  // 获取条目剧照
  const data = await xhrTimeout(HTML_PREVIEW(doubanId, cat, isGame ? undefined : 'o'))
  _response = data._response
  logPreviewTrace(doubanId, {
    step: 'html-o',
    response: String(_response || '').length,
    cover: cheerio(_response)('.cover img').length
  })

  if (isGame) {
    //
  } else {
    // 当官方剧照少于12张, 再次请求使用所有剧照
    const { length } = cheerio(_response)('.cover img')

    if ((length > 0 && length < 12) || length === 0) {
      const data = await xhrTimeout(HTML_PREVIEW(doubanId, cat, 'a'))
      _response = data._response
      logPreviewTrace(doubanId, {
        step: 'html-a',
        response: String(_response || '').length,
        cover: cheerio(_response)('.cover img').length
      })
    }

    // 当官方剧照等于0张, 不进行倒序操作
    if (length !== 0) {
      // 判断是否有分页
      const match = _response.match(/<span class="count">\(共(\d+)张\)<\/span>/)
      const count = match ? Number(match[1]) : 0
      const start = count >= 100 ? count - 50 : count >= 30 ? count - 30 : 0
      logPreviewTrace(doubanId, { step: 'count', count, start, matched: !!match })

      // 由于剧照是根据时间从新到旧排序的, 需要获取较后面的数据, 以免剧透
      if (start) {
        const data = await xhrTimeout(HTML_PREVIEW(doubanId, cat, 'a', start))
        _response = data._response
        logPreviewTrace(doubanId, {
          step: 'html-start',
          start,
          cover: cheerio(_response)('.cover img').length
        })
      }
    }

    const finalLength = cheerio(_response)('.cover img').length
    if (finalLength === 0) {
      const data = await xhrTimeout(HTML_PREVIEW(doubanId, cat, 'R'))
      _response = data._response
      logPreviewTrace(doubanId, {
        step: 'html-R',
        cover: cheerio(_response)('.cover img').length
      })
    }
  }

  const $ = cheerio(_response)
  const result = (
    $(isGame ? '.pholist img' : '.cover img')
      .map((_index: number, element) => {
        let src = cheerio(element).attr('src').replace('http://', 'https://')
        if (isGame) src = src.replace('/photo/thumb/', '/photo/photo/')
        return src
      })
      .get() || []
  ).filter((_item, index: number) => index < maxCount)

  logPreviewTrace(doubanId, { step: 'final', data: result.length })

  return {
    data: result,
    referer
  }
}

/**
 * 获取预告片
 * @param doubanId
 * @param maxCount
 */
export async function getTrailer(
  doubanId: DoubanId,
  maxCount: number = 2
): Promise<{
  data: TrailerItem[]
  referer: string
}> {
  if (!doubanId) {
    return {
      data: [],
      referer: ''
    }
  }

  const url = HTML_TRAILER(doubanId)
  const { _response } = await xhrTimeout(url)
  const $ = cheerio(_response)

  return {
    data: (
      $('.pr-video')
        .map((_index: number, element) => {
          const $row = cheerio(element)
          return {
            cover: $row.find('img').attr('src').replace('http://', 'https://'),
            title: $row.text().trim(),
            href: $row.attr('href') || ''
          }
        })
        .get() || []
    ).filter((_item, index: number) => index < maxCount),
    referer: url
  }
}

/** 游戏视频整体超时阈值 */
const VIDEO_TOTAL_TIMEOUT = 12000

/**
 * 获取游戏视频 (外层兜总超时)
 * @param doubanId
 * @param cat
 */
export async function getVideo(
  doubanId: DoubanId,
  cat: Cat,
  maxCount: number = 3
): Promise<{
  data: VideoItem[]
  referer: string
}> {
  if (!doubanId) {
    return {
      data: [],
      referer: ''
    }
  }

  const url = HTML_VIDEOS(doubanId, cat)
  let timer: ReturnType<typeof setTimeout> | undefined

  return Promise.race([
    getVideoCore(url, maxCount),
    new Promise<{ data: VideoItem[]; referer: string }>(resolve => {
      timer = setTimeout(() => resolve({ data: [], referer: url }), VIDEO_TOTAL_TIMEOUT)
    })
  ]).finally(() => clearTimeout(timer))
}

/** 游戏视频主流程 */
async function getVideoCore(
  url: string,
  maxCount: number
): Promise<{
  data: VideoItem[]
  referer: string
}> {
  const { _response } = await xhrTimeout(url)
  const $ = cheerio(_response)

  const _videos: VideoItem[] = (
    $('.video-list li')
      .map((_index: number, element) => {
        const $row = cheerio(element)
        const $a = $row.find('p a')
        return {
          cover: $row.find('img').attr('src').replace('http://', 'https://'),
          title: $a.text().trim().split('_哔哩哔哩')?.[0] || '',
          href: $a.attr('href') || '',
          src: ''
        }
      })
      .get() || []
  ).filter((_item, index: number) => index < 3)

  for (let i = 0; i < _videos.length; i += 1) {
    const { _response } = await xhrTimeout(`${HOST_DB}${_videos[i].href}`)
    await sleep(800)

    const src = cheerio(_response)('.video-player-fallback').attr('href') || ''
    if (src.includes(`www.${HOST_AC_REFERER}`)) _videos[i].src = src
  }

  return {
    data: _videos.filter(item => item.src).filter((_item, index: number) => index < maxCount),
    referer: url
  }
}

/** 简单去除特殊干扰分析的字符 */
function removeSpecial(str: unknown) {
  return String(str)
    .replace(/(&amp;)|-|：|《|》|（|）|“|”|，|。|之/g, '')
    .toLocaleLowerCase()
}
