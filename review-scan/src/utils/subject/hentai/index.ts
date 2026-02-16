/*
 * @Author: czy0729
 * @Date: 2020-07-15 00:12:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-17 14:28:47
 */
import { loadJSON } from '@assets/json'
import { SubjectId } from '@types'
import { getTimestamp } from '../../index'
import { SORT } from '../anime'
import {
  HENTAI_BODY,
  HENTAI_CHARA,
  HENTAI_COLLECTED,
  HENTAI_CONTENT,
  HENTAI_FIRST,
  HENTAI_JOB,
  HENTAI_SORT,
  HENTAI_TAGS,
  HENTAI_TAGS_MAP,
  HENTAI_YEAR
} from './ds'
import { Finger, Item, Query, SearchResult, UnzipItem } from './types'

export {
  HENTAI_BODY,
  HENTAI_CHARA,
  HENTAI_COLLECTED,
  HENTAI_CONTENT,
  HENTAI_FIRST,
  HENTAI_JOB,
  HENTAI_SORT,
  HENTAI_TAGS,
  HENTAI_TAGS_MAP,
  HENTAI_YEAR
}

const SEARCH_CACHE: Record<Finger, SearchResult> = {}
let hentai: Item[] = []
let loaded: boolean = false

/** OTA 感觉体验不太好，而且容易出错，暂时使用本地版本 */
function getData() {
  return hentai
}

/** 初始化番剧数据 */
export async function init() {
  if (loaded) return

  hentai = await loadJSON('thirdParty/h.min')
  loaded = true
}

/** 根据 index 选一项 */
export function pick(index: number): Item {
  init()
  return getData()[index]
}

/** 根据条目 id 查询一项 */
export function findHentai(id: SubjectId): Item {
  init()
  return getData().find(item => item.id == id)
}

/** @deprecated 根据条目 id 查询一项 */
export function find(id: SubjectId): UnzipItem {
  init()
  return unzip(getData().find(item => item.id == id))
}

/** 只返回下标数组对象 */
export function search(query: Query): SearchResult {
  init()

  // 查询指纹
  const finger = JSON.stringify(query || {})
  const { first, year, chara, job, body, content, sort } = query || {}

  if (sort !== '随机' && SEARCH_CACHE[finger]) {
    return SEARCH_CACHE[finger]
  }

  let _list = []
  let yearReg: RegExp
  if (year) {
    yearReg = new RegExp(year === '2000以前' ? '^(2000|1\\d{3})' : `^(${year})`)
  }

  const data = getData()
  data.forEach((item, index) => {
    let match = true

    if (match && first) match = first === item.f
    if (match && year) match = yearReg.test(item.a)
    if (match && chara) match = item.t?.includes(HENTAI_TAGS_MAP[chara])
    if (match && job) match = item.t?.includes(HENTAI_TAGS_MAP[job])
    if (match && body) match = item.t?.includes(HENTAI_TAGS_MAP[body])
    if (match && content) match = item.t?.includes(HENTAI_TAGS_MAP[content])

    if (match) _list.push(index)
  })

  switch (sort) {
    case '上映时间':
      _list = _list.sort((a, b) => SORT.begin(data[a], data[b], 'a'))
      break

    case '名称':
      _list = _list.sort((a, b) => SORT.name(data[a], data[b], 'f'))
      break

    case '排名':
      _list = _list.sort((a, b) => SORT.rating(data[a], data[b], 's', 'f'))
      break

    case '评分人数':
      _list = _list.sort((a, b) => SORT.total(data[a], data[b], 'n'))
      break

    case '随机':
      _list = _list.sort(() => SORT.random())
      break

    default:
      break
  }

  const result: SearchResult = {
    list: _list,
    pagination: {
      page: 1,
      pageTotal: 1
    },
    _finger: finger,
    _loaded: getTimestamp()
  }
  SEARCH_CACHE[finger] = result

  return result
}

/** @deprecated 转换压缩数据的 key 名 */
export function unzip(item: any): UnzipItem {
  return {
    id: item?.id || 0,
    hId: item?.h || 0,
    cn: item?.c || '',
    jp: item?.j || '',
    image: item?.i || '',
    air: item?.a || '',
    ep: item?.e || '',
    score: item?.s || 0,
    rank: item?.r || 0,
    total: item?.n || 0,
    tags: item?.t || []
  }
}

export function getTagType(tag: number) {
  if (tag >= 40) return 'content'
  if (tag >= 25) return 'body'
  if (tag >= 8) return 'job'
  return 'chara'
}
