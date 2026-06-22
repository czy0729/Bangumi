/*
 * @Author: czy0729
 * @Date: 2025-06-08 20:20:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-03 23:20:55
 */
import { monoStore } from '@stores'
import { cData, cheerio, cMap, feedback, getTimestamp, htmlMatch, info, queue, sleep } from '@utils'
import { xhrCustom } from '@utils/fetch'
import { get, gets, update } from '@utils/kv'
import { FROZEN_FN } from '@constants'
import { DECODE, HOST, HOST_INFO, HOST_PIXIV, HOST_PIXIV_RE, LIST_LIMIT, MAX_PAGE } from './ds'

import type { Id, ListEmpty } from '@types'
import type { HandleListProgress, HandleSrcsProgress, ItemInfo, List, Srcs } from './types'

export async function tag(
  q: string,
  page: number = 1,
  onProgress: HandleListProgress = FROZEN_FN,
  onSrcsProgress: HandleSrcsProgress = FROZEN_FN,
  forceRefresh: boolean = false
): Promise<ListEmpty<ItemInfo> | false> {
  let key = `pic_tag_${q}` as const
  if (page > 1) key += `_${page}`

  let data: ListEmpty<ItemInfo>
  if (!forceRefresh) {
    data = await get(encodeKey(key))
    if (data) return data
  }

  let html = ''
  try {
    let url = `${HOST}/tag/${encodeURIComponent(q)}`
    if (page > 1) url += `/list/${page}`
    html = (await xhrCustom({ url }))._response
  } catch (error) {
    return false
  }

  const $ = cheerio(htmlMatch(html, DECODE.START, DECODE.END))
  const list = cMap($('.grid-container .grid-item'), $row => ({
    href: cData($row.find('> a'), 'href').match(/\/([^/]+)\.html$/)?.[1] || '',
    id: cData($row.find('img'), 'src').match(/\/small\/(\d+)\.jpg-\d+$/)?.[1] || '',
    title: '',
    cate: '',
    num: '',
    tags: '',
    aspectRatio: 0
  })).filter(item => !!(item.href && item.id))

  const uniqueList = Array.from(new Map(list.map(item => [item.id, item])).values())
  if (!uniqueList.length) return null

  if (!forceRefresh) info(`首次索引到 ${uniqueList.length} 项，请耐心等待`)
  feedback(true)

  const total = uniqueList.length
  const infos: Record<Id, ItemInfo> = await gets(uniqueList.map(item => `pic_info_${item.id}`))

  const fetchs = uniqueList.map((item, index) => {
    return async () => {
      try {
        const key = `pic_info_${item.id}` as const
        let percent = `${Math.floor(((index + 1) / total) * 100)}%`
        if (percent === '0%' || percent === '100%') percent = ''

        if (infos[key]?.tags) {
          uniqueList[index] = infos[key]
          onProgress(uniqueList, percent)
          await src([item.id], onSrcsProgress)
          return
        }

        await sleep(200)
        const { _response } = await xhrCustom({
          url: HOST_INFO(item.href)
        })

        const aspectRatio = _response.match(/(\d+)\s*[x×]\s*(\d+)/i)
        if (aspectRatio)
          item.aspectRatio = parseInt(aspectRatio[1], 10) / parseInt(aspectRatio[2], 10)

        const tags = _response.match(/<meta\s+name=["']keywords["']\s+content=(["'])(.*?)\1/)
        if (tags) item.tags = tags[2]

        // 处理中回调进度
        onProgress(uniqueList, percent)

        await update(encodeKey(key), item)
        await src([item.id], onSrcsProgress)
      } catch {}
    }
  })
  await queue(fetchs, 1)

  const realLimit = 30
  const totalCount =
    uniqueList.length <= LIST_LIMIT ? (page - 1) * realLimit + uniqueList.length : page * realLimit

  const qText = encodeKey(q)
  const currentTotal = Number((await monoStore.fetchPicTotal(qText)) || 0)
  if ((totalCount && !currentTotal) || (totalCount && currentTotal && totalCount > currentTotal)) {
    update(`pic_total_${qText}`, String(totalCount))
    monoStore.updatePicTotal(q, totalCount)
  }

  data = {
    list: uniqueList,
    pagination: {
      page,
      pageTotal: uniqueList.length <= LIST_LIMIT ? page : MAX_PAGE
    },
    _loaded: getTimestamp()
  }
  update(encodeKey(key), data)

  return data
}

/** 获取实际地址 */
export async function src(ids: Id[], onProgress: (data: Srcs, percent: string) => any = FROZEN_FN) {
  const data: Srcs = await gets(ids.map(id => `pic_tag_${id}`))
  const total = ids.length

  const fetchs = ids.map((id, index) => {
    return async () => {
      const key = `pic_tag_${id}` as const
      let percent = `${Math.floor(((index + 1) / total) * 100)}%`
      if (percent === '0%' || percent === '100%') percent = ''

      try {
        if (data[key] && data[key].startsWith('http')) {
          onProgress(data, percent)
          return
        }

        const response = await fetch(`https://pixiv.re/${id}.jpg`, {
          method: 'HEAD'
        })

        const originUrl = response.headers.get('x-origin-url')
        const finalSrc = originUrl || 'null'

        data[key] = finalSrc
        onProgress(data, percent)

        await update(encodeKey(key), finalSrc)
        return finalSrc
      } catch (err) {
        onProgress(data, percent)
        return 'null'
      }
    }
  })

  await queue(fetchs, 2)
  return data
}

export function processImages(items: List): List {
  return items.map(item => ({
    ...item,
    aspectRatio: item.aspectRatio || calculateAspectRatio(item.title) || 1
  }))
}

function calculateAspectRatio(title: string = ''): number {
  const sizeMatch = title.match(/尺寸(\d+)x(\d+)/)
  if (!sizeMatch || sizeMatch.length < 3) return 1
  const width = parseInt(sizeMatch[1], 10)
  const height = parseInt(sizeMatch[2], 10)
  return width / height
}

export function getURI(
  image: string = '',
  prefix:
    | 'square'
    | 'thumb150'
    | 'orj360'
    | 'orj480'
    | 'mw690'
    | 'mw1024'
    | 'mw2048'
    | 'small'
    | 'bmiddle'
    | 'large' = 'orj360'
): string {
  if (!image) return ''
  if (!image.startsWith('http')) return `${DECODE.URI}/${prefix}/${image}`
  if (image.includes('404.jpg')) return 'null'

  const url = image.replace(HOST_PIXIV, HOST_PIXIV_RE)
  if (prefix === 'large') return url

  if (url.includes('/img-original/img/')) {
    if (prefix === 'mw690') {
      return url
        .replace('/img-original/img/', '/c/600x1200_90_webp/img-master/img/')
        .replace('_p0.', '_p0_master1200.')
        .replace('.png', '.jpg')
    }

    if (prefix === 'square' || prefix === 'thumb150') {
      return url
        .replace('/img-original/img/', '/c/540x540_70/img-master/img/')
        .replace('_p0.', '_p0_square1200.')
        .replace('.png', '.jpg')
    }

    return url
      .replace('/img-original/img/', '/c/240x480/img-master/img/')
      .replace('_p0.', '_p0_master1200.')
      .replace('.png', '.jpg')
  }

  return url
}

export function encodeKey(key: string) {
  return key.replace(/\//g, '_')
}
