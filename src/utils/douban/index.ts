/*
 * 豆瓣搜索逻辑
 * @Author: czy0729
 * @Date: 2022-06-21 23:43:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-06 13:13:40
 */
import { asc, similar, sleep } from '../utils'
import { xhrCustom } from '../fetch'
import { cheerio } from '../html'
import { DoubanId, Cat, SubType, SearchItem, VideoItem, TrailerItem } from './types'

const HOST = 'https://www.douban.com'

const HOST_MOVIE = 'https://movie.douban.com'

/** 搜索页 */
const HTML_SEARCH = (q: string, cat?: Cat) => {
  let _cat
  if (cat === 'game') {
    _cat = 3114
  } else {
    _cat = 1002
  }

  return `${HOST}/search?cat=${_cat}&q=${q}`
}

/** 条目页 */
const HTML_SUBJECT = (doubanId: DoubanId) => {
  return `${HOST_MOVIE}/subject/${doubanId}`
}

/** 预览页 */
const HTML_PREVIEW = (
  doubanId: DoubanId,
  cat?: Cat,
  subtype: SubType = 'o',
  start = 0
) => {
  if (cat === 'game') {
    return `https://www.douban.com/game/${doubanId}/photos/?type=1&start=0&sortby=hot`
  }

  return `${HTML_SUBJECT(
    doubanId
  )}/photos?type=S&start=${start}&sortby=time&size=a&subtype=${subtype}`
}

/** 用户视频页 */
const HTML_VIDEOS = (doubanId: DoubanId, cat: Cat = 'subject') => {
  return `${HOST}/${cat}/${doubanId}/videos`
}

/** 视频预告页 */
const HTML_TRAILER = (doubanId: DoubanId) => {
  return `${HOST_MOVIE}/subject/${doubanId}/trailer`
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

  return (
    $('.result .content')
      .map((index: number, element) => {
        const $row = cheerio(element)
        const $a = $row.find('h3 a')
        return {
          id: $a.attr('onclick').match(/sid: (\d+)/)?.[1],
          title: removeSpecial($a.text().trim()),
          desc: removeSpecial($row.find('p').text().trim())
        }
      })
      .get() || []
  )
    .filter((item: SearchItem) => item.id)
    .sort((a: SearchItem, b: SearchItem) => asc(a.title.length, b.title.length))
}

/**
 * 匹配影视结果
 * @param q
 * @param result
 */
export function matchMovie(q: string, result: SearchItem[], jp?: string): DoubanId {
  const SIMILAR_RATE = 0.7
  const _q = removeSpecial(q)
  let doubanId: DoubanId = false

  // 先匹配标题
  result.forEach(item => {
    if (doubanId) return
    if (similar(item.title, _q) < SIMILAR_RATE) {
      if (!item.desc.includes('原名:')) return

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
        .map((index: number, element) => {
          let src = cheerio(element).attr('src').replace('http://', 'https://')
          if (isGame) src = src.replace('/photo/thumb/', '/photo/photo/')
          return src
        })
        .get() || []
    ).filter((item, index: number) => index < maxCount),
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
        .map((index: number, element) => {
          const $row = cheerio(element)
          return {
            cover: $row.find('img').attr('src').replace('http://', 'https://'),
            title: $row.text().trim(),
            href: $row.attr('href') || ''
          }
        })
        .get() || []
    ).filter((item, index: number) => index < maxCount),
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
      .map((index: number, element) => {
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
  ).filter((item, index: number) => index < 3)

  for (let i = 0; i < _videos.length; i += 1) {
    const { _response } = await xhrCustom({
      url: `${HOST}${_videos[i].href}`
    })
    await sleep(800)

    const src = cheerio(_response)('.video-player-fallback').attr('href') || ''
    if (src.includes('www.bilibili.com')) _videos[i].src = src
  }

  return {
    data: _videos
      .filter(item => item.src)
      .filter((item, index: number) => index < maxCount),
    referer: url
  }
}

/** 简单去除特殊干扰分析的字符 */
function removeSpecial(str: any) {
  return String(str).replace(/ |(&amp;)|-|：|《|》|（|）|“|”|，|。|之/g, '')
}
