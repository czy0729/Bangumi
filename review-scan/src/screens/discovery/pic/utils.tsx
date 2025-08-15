/*
 * @Author: czy0729
 * @Date: 2025-06-08 20:20:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-15 20:28:06
 */
import { monoStore } from '@stores'
import {
  cData,
  cheerio,
  cMap,
  cText,
  feedback,
  getTimestamp,
  htmlMatch,
  info,
  queue,
  sleep
} from '@utils'
import { xhrCustom } from '@utils/fetch'
import { get, gets, update } from '@utils/kv'
import { FROZEN_FN } from '@constants'
import { Id, ListEmpty } from '@types'
import { DECODE, HOST, HOST_INFO, HOST_URL, PROGRESS_LIMIT } from './ds'
import { HandleListProgress, HandleSrcsProgress, ItemInfo, List, Srcs } from './types'

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
    data = await get(key)
    if (data) return data
  }

  let html = ''
  try {
    let url = `${HOST}/tag/${q}`
    if (page > 1) url += `/page/${page}`
    html = (
      await xhrCustom({
        url
      })
    )._response
  } catch (error) {
    return false
  }

  const $ = cheerio(htmlMatch(html, DECODE.START, DECODE.END))
  const list = cMap($('article > .post'), $row => ({
    href: cData($row.find('> a'), 'href').split(HOST)?.[1] || '',
    id: cData($row.find('img'), 'srcset').split('/small/')?.[1]?.split('.jpg')?.[0] || '',
    title: cText($row.find('h2')),
    cate: cText($row.find(DECODE.CATE)),
    num: cText($row.find(DECODE.NUM)),
    tags: '',
    aspectRatio: 0
  })).filter(item => !item.num)
  if (!list.length) return null

  if (!forceRefresh) info(`首次索引到 ${list.length} 项，请耐心等待`)
  feedback(true)

  const infos: Record<Id, ItemInfo> = await gets(list.map(item => `pic_info_${item.id}`))
  const fetchs = list.map((item, index) => {
    return async () => {
      try {
        const key = `pic_info_${item.id}`
        if (infos[key]) {
          list[index] = infos[key]
          await src([item.id], onSrcsProgress)
          return
        }

        await sleep(800)
        const { _response } = await xhrCustom({
          url: HOST_INFO(item.id)
        })
        const aspectRatio = _response.match(/(\d+)\s*[x×]\s*(\d+)/i)
        if (aspectRatio)
          item.aspectRatio = parseInt(aspectRatio[1], 10) / parseInt(aspectRatio[2], 10)
        const tags = _response.match(/<meta\s+name='keywords'\s+content='([^']+)'/)
        if (tags) item.tags = tags[1]

        if (
          (list.length > 2 && index === 2) ||
          (index && index !== list.length - 1 && index % PROGRESS_LIMIT === 0)
        ) {
          onProgress(list)
        }
        await update(key, item)
        await src([item.id], onSrcsProgress)

        return src
      } catch (error) {}
    }
  })
  await queue(fetchs, 1)

  const total = Number(cText($(DECODE.PAGE_TOTAL)).match(/\d+篇/g)?.[0]?.replace('篇', '') || '1')
  update(`pic_total_${q}`, String(total))
  monoStore.updatePicTotal(q, total)

  data = {
    list,
    pagination: {
      page,
      pageTotal: Math.ceil(total / 40)
    },
    _loaded: getTimestamp()
  }
  update(key, data)

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
        await update(key, src)

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
