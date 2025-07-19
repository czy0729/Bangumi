/*
 * @Author: czy0729
 * @Date: 2022-06-21 23:43:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-10 17:59:01
 */
import { HOST_AC_REFERER, HOST_DB, HOST_DB_MOVIE } from '@constants/cdn'
import { xhrCustom } from '../fetch'
import { cheerio } from '../html'
import { desc, similar, sleep } from '../utils'
import { Cat, DoubanId, SearchItem, SubType, TrailerItem, VideoItem } from './types'

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

  return `${HTML_SUBJECT(
    doubanId
  )}/photos?type=S&start=${start}&sortby=time&size=a&subtype=${subtype}`
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
  const { _response } = await xhrCustom({
    url: HTML_SEARCH(q, cat)
  })
  const $ = cheerio(_response)

  try {
    return (
      $('.result .content')
        .map((_index: number, element) => {
          const $row = cheerio(element)
          const $a = $row.find('h3 a')
          const cast = removeSpecial($row.find('.subject-cast').text().trim()) || ''
          return {
            id: $a.attr('onclick').match(/sid: (\d+)/)?.[1],
            title: removeSpecial($a.text().trim()),
            name: cast.match(/原名:(.*?)\//)?.[1] || '',
            desc: removeSpecial($row.find('p').text().trim()),
            year: cast.match(/(\d{4})$/)?.[1] || ''
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
  const _q = removeSpecial(q)
  let doubanId: DoubanId = false

  // 原名最优先
  result.forEach(item => {
    if (doubanId) return
    if (year && item.year && year != item.year) return
    if (item.name && item.name === jp) doubanId = item.id
  })

  // 必须命中年份, 然后匹配标题相似度
  result.forEach(item => {
    if (doubanId) return
    if (
      year &&
      item.year &&
      item.year == year &&
      item.name &&
      jp &&
      similar(removeSpecial(item.name), removeSpecial(jp)) >= SIMILAR_RATE
    ) {
      doubanId = item.id
    }
  })

  // 标题相似度
  result.forEach(item => {
    if (doubanId) return
    if (similar(item.title, _q) < SIMILAR_RATE) {
      if (!item.desc.includes('原名:')) return
      if (year && item.year && year != item.year) return

      const _jp = item.desc.split(' / ')[0].replace('原名:', '')
      if (similar(_jp, jp || q) < 0.7) return
    }

    doubanId = item.id
  })

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

/**
 * 获取条目图片
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

  const isGame = cat === 'game'
  let _response: string

  // 获取条目剧照
  const data = await xhrCustom({
    url: HTML_PREVIEW(doubanId, cat, isGame ? undefined : 'o')
  })
  _response = data._response

  if (isGame) {
    //
  } else {
    // 当官方剧照少于12张, 再次请求使用所有剧照
    const { length } = cheerio(_response)('.cover img')

    if ((length > 0 && length < 12) || length === 0) {
      const data = await xhrCustom({
        url: HTML_PREVIEW(doubanId, cat, 'a')
      })
      _response = data._response
    }

    // 当官方剧照等于0张, 不进行倒序操作
    if (length !== 0) {
      // 判断是否有分页
      const match = _response.match(/<span class="count">\(共(\d+)张\)<\/span>/)
      const count = match ? Number(match[1]) : 0
      const start = count >= 100 ? count - 50 : count >= 30 ? count - 30 : 0

      // 由于剧照是根据时间从新到旧排序的, 需要获取较后面的数据, 以免剧透
      if (start) {
        const data = await xhrCustom({
          url: HTML_PREVIEW(doubanId, cat, 'a', start)
        })
        _response = data._response
      }
    }
  }

  const $ = cheerio(_response)
  return {
    data: (
      $(isGame ? '.pholist img' : '.cover img')
        .map((_index: number, element) => {
          let src = cheerio(element).attr('src').replace('http://', 'https://')
          if (isGame) src = src.replace('/photo/thumb/', '/photo/photo/')
          return src
        })
        .get() || []
    ).filter((_item, index: number) => index < maxCount),
    referer: HTML_SUBJECT(doubanId)
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
  const { _response } = await xhrCustom({
    url
  })
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

/**
 * 获取游戏视频
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
  const { _response } = await xhrCustom({
    url
  })
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
    const { _response } = await xhrCustom({
      url: `${HOST_DB}${_videos[i].href}`
    })
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
function removeSpecial(str: any) {
  return String(str)
    .replace(/ |(&amp;)|-|：|《|》|（|）|“|”|，|。|之/g, '')
    .toLocaleLowerCase()
}
