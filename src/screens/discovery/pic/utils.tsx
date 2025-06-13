/*
 * @Author: czy0729
 * @Date: 2025-06-08 20:20:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-13 21:34:30
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
import Crypto from '@utils/crypto'
import { xhrCustom } from '@utils/fetch'
import { get, gets, update } from '@utils/kv'
import { FROZEN_FN } from '@constants'
import { Id, ListEmpty } from '@types'
import { ItemInfo } from './types'

type List = ItemInfo[]
type Srcs = Record<Id, string>
type HandleListProgress = (data: List) => any
type HandleSrcsProgress = (data: Srcs) => any

const DECODE = {
  BASE: Crypto.get('U2FsdGVkX1821ej1UrCAbmt2N3LNN/nd4iGmBRn3/kRRTtynOAU3fO3y43XqZJ5H') as string,
  GO: Crypto.get(
    'U2FsdGVkX19vnk2JaWkcvW+JSD7V9JCGIYAk0o7CMi9/U113Ef1fugD12fiiRWzmgcr65Cv35izi8E4Lbs2e8w=='
  ) as string,
  START: Crypto.get('U2FsdGVkX1/P8ir0kD1gMSn2Fzyd7pzLcMb+/sqJV+tuTsMXh+0g682wtRdM5gMg') as string,
  END: Crypto.get(
    'U2FsdGVkX19SbbeulS6D6PwdWQv18Vg0tjHjuLhwPdQfn/usdyfY5ralrJKN19We7YU0nMxmhEi6ptjGPR7+OA=='
  ) as string,
  CATE: Crypto.get('U2FsdGVkX1+9Ge+gmkYPSgNOuKSTBmbXvENLmV5yPhU=') as string,
  NUM: Crypto.get('U2FsdGVkX187Exptse19agHhh+QbMYw2+Pll1zcTQtk=') as string,
  PAGE_TOTAL: Crypto.get('U2FsdGVkX19cOt1GWU/MGZWlzr6WGSTYX7EJuh0FlGs=') as string,
  SRC: Crypto.get('U2FsdGVkX189CcuNwbF7lq7jvJXpTBd/b7S2BIVeTTg=') as string,
  URI: Crypto.get(
    'U2FsdGVkX19uAqpov9MSMl/o3juIgzNsMTKTXKvbukkzowv9oU8oZutdx/K1MrVsrxHZya3gR7JH8w406QXWf/iRQQqfTqgqZYMkeLGx7wtHkmEb6dbPpw//6L3hZ+qu35Zwv58nuw6aDhg77TX88Q=='
  ) as string
} as const

const HOST = DECODE.BASE
const HOST_INFO = (id: Id) => `${HOST}/${id}.html`
const HOST_URL = (id: Id) => `${DECODE.GO}/${id}.jpg`
const PROGRESS_LIMIT = 4

export async function tag(
  q: string,
  page: number = 1,
  onProgress: HandleListProgress = FROZEN_FN,
  onSrcsProgress: HandleSrcsProgress = FROZEN_FN
): Promise<ListEmpty<ItemInfo> | false> {
  let key = `pic_tag_${q}`
  if (page > 1) key += `_${page}`

  let data = await get(key)
  if (data) return data

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

  info(`首次索引到 ${list.length} 项，请耐心等待`)
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

        await sleep(1000)
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

        await sleep(1000)
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
