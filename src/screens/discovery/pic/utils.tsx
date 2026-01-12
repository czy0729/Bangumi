/*
 * @Author: czy0729
 * @Date: 2025-06-08 20:20:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-11 06:36:20
 */
import { monoStore } from '@stores'
import { cData, cheerio, cMap, feedback, getTimestamp, htmlMatch, info, queue, sleep } from '@utils'
import { xhrCustom } from '@utils/fetch'
import { get, gets, update } from '@utils/kv'
import { FROZEN_FN } from '@constants'
import { DECODE, HOST, HOST_INFO, HOST_URL, LIST_LIMIT, MAX_PAGE, PROGRESS_LIMIT } from './ds'

import type { Id, ListEmpty } from '@types'
import type { HandleListProgress, HandleSrcsProgress, ItemInfo, List, Srcs } from './types'

export async function tag(
  q: string,
  page: number = 1,
  onProgress: HandleListProgress = FROZEN_FN,
  onSrcsProgress: HandleSrcsProgress = FROZEN_FN,
  forceRefresh: boolean = false
): Promise<ListEmpty<ItemInfo> | false> {
  let key = `pic_tag_${q}`
  if (page > 1) key += `_${page}`

  let data: ListEmpty<ItemInfo>
  if (!forceRefresh) {
    data = await get(encodeKey(key))
    if (data) return data
  }

  let html = ''
  try {
    let url = `${HOST}/search/${encodeURIComponent(q)}`
    if (page > 1) url += `/?pos=${page}`
    html = (
      await xhrCustom({
        url
      })
    )._response
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

  const infos: Record<Id, ItemInfo> = await gets(uniqueList.map(item => `pic_info_${item.id}`))
  const fetchs = uniqueList.map((item, index) => {
    return async () => {
      try {
        const key = `pic_info_${item.id}`
        if (infos[key]) {
          uniqueList[index] = infos[key]
          await src([item.id], onSrcsProgress)
          return
        }

        await sleep(800)
        const { _response } = await xhrCustom({
          url: HOST_INFO(item.href)
        })
        const aspectRatio = _response.match(/(\d+)\s*[x×]\s*(\d+)/i)
        if (aspectRatio)
          item.aspectRatio = parseInt(aspectRatio[1], 10) / parseInt(aspectRatio[2], 10)
        const tags = _response.match(/<meta\s+name='keywords'\s+content='([^']+)'/)
        if (tags) item.tags = tags[1]

        if (
          (uniqueList.length > 2 && index === 2) ||
          (index && index !== uniqueList.length - 1 && index % PROGRESS_LIMIT === 0)
        ) {
          onProgress(uniqueList)
        }
        await update(encodeKey(key), item)
        await src([item.id], onSrcsProgress)

        return src
      } catch (error) {}
    }
  })
  await queue(fetchs, 1)

  const realLimit = 30
  const total =
    uniqueList.length <= LIST_LIMIT ? (page - 1) * realLimit + uniqueList.length : page * realLimit

  const qText = encodeKey(q)
  const currentTotal = Number((await monoStore.fetchPicTotal(qText)) || 0)
  if ((total && !currentTotal) || (total && currentTotal && total > currentTotal)) {
    update(`pic_total_${qText}`, String(total))
    monoStore.updatePicTotal(q, total)
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

export async function src(ids: Id[], onProgress: HandleSrcsProgress = FROZEN_FN) {
  const data: Srcs = await gets(ids.map(id => `pic_tag_${id}`))
  const fetchs = ids.map(id => {
    return async () => {
      try {
        const key = `pic_tag_${id}`
        if (data[key]) return

        await sleep(800)
        const { _response } = await xhrCustom({
          url: HOST_URL(id)
        })
        const $ = cheerio(htmlMatch(_response, '<body>', '</body>'))
        const src = (cData($(DECODE.SRC), 'src') || '').split('/large/')?.[1] || 'null'
        data[key] = src

        onProgress(data)
        await update(encodeKey(key), src)

        return src
      } catch (error) {}
    }
  })
  await queue(fetchs, 1)

  return data
}

export function processImages(items: List): List {
  return items.map(item => ({
    ...item,
    aspectRatio: item.aspectRatio || calculateAspectRatio(item.title) || 1
  }))
}

function calculateAspectRatio(title: string = ''): number {
  // 使用正则表达式从标题中提取尺寸
  const sizeMatch = title.match(/尺寸(\d+)x(\d+)/)
  if (!sizeMatch || sizeMatch.length < 3) return 1

  const width = parseInt(sizeMatch[1], 10)
  const height = parseInt(sizeMatch[2], 10)

  // 计算长宽比（宽度/高度）
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
) {
  return `${DECODE.URI}/${prefix}/${image}` as const
}

export function encodeKey(key: string) {
  return key.replace(/\//g, '_')
}
