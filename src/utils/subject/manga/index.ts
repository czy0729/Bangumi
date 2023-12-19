/*
 * @Author: czy0729
 * @Date: 2021-01-09 20:07:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-18 04:13:42
 */
import { SubjectId } from '@types'
import { desc, getTimestamp } from '../../index'
import { decode, get } from '../../protobuf'
import { getPinYinFirstCharacter } from '../../thirdParty/pinyin'
import { SORT } from './../anime'
import {
  MANGA_COLLECTED,
  MANGA_FIRST,
  MANGA_HD,
  MANGA_SORT,
  MANGA_STATUS,
  MANGA_TAGS,
  MANGA_TAGS_MAP,
  MANGA_YEAR
} from './ds'
import { Finger, Item, Query, SearchResult, UnzipItem } from './types'

export {
  MANGA_COLLECTED,
  MANGA_FIRST,
  MANGA_HD,
  MANGA_SORT,
  MANGA_STATUS,
  MANGA_TAGS,
  MANGA_TAGS_MAP,
  MANGA_YEAR
}

/** 缓存搜索结果 */
const SEARCH_CACHE: Record<Finger, SearchResult> = {}

let manga: Item[] = []

/** v7.1.0 后取消 OTA */
function getData() {
  return manga
}

/** 初始化番剧数据 */
export async function init() {
  if (manga.length) return

  await decode('manga')
  manga = get('manga') || []
}

/** 根据 index 选一项 */
export function pick(index: number): Item {
  init()
  return getData()[index]
}

/** 根据条目 id 查询一项 */
export function findManga(id: SubjectId): Item {
  init()
  return getData().find(item => item.i == id)
}

/** @deprecated 根据条目 id 查询一项 */
export function find(id: SubjectId): UnzipItem {
  init()
  return unzip(getData().find(item => item.i == id))
}

/** 只返回下标数组对象 */
export function search(query: Query): SearchResult {
  init()

  // 查询指纹
  const finger = JSON.stringify(query || {})
  const { first, year, status, tags = [], sort } = query || {}

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

    // title
    if (match && first) match = first === getPinYinFirstCharacter(item.f)

    // publish
    if (match && year) match = yearReg.test(String(item.p))

    // status: 1
    if (match && status) {
      match = (item.u === 1 && status === '连载') || (!item.u && status === '完结')
    }

    // tags: '科幻 机战 悬疑 战斗 战争'
    if (match && tags.length) {
      tags.forEach((tag: string) => {
        if (match) match = item.b?.includes(MANGA_TAGS_MAP[tag])
      })
    }

    if (match) _list.push(index)
  })

  switch (sort) {
    case '发行时间':
      _list = _list.sort((a, b) => desc(data[a].p || '0000', data[b].p || '0000'))
      break

    case '名称':
      _list = _list.sort((a, b) => SORT.name(data[a], data[b], 'f'))
      break

    case '评分':
    case '排名':
      _list = _list.sort((a, b) => SORT.rating(data[a], data[b], 's', 'r'))
      break

    case '评分人数':
      _list = _list.sort((a, b) => SORT.total(data[a], data[b], 'l'))
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
    id: item?.i || 0,
    mid: item?.m || 0,
    title: item?.t || '',
    image: item?.c || '',
    score: item?.s || 0,
    rank: item?.r || 0,
    total: item?.l || 0,
    ep: item?.e || '',
    author: item?.a || '',
    cates: item?.b || '',
    publish: item?.p || '',
    update: item?.d || '',
    status: item?.u ? 1 : 0,
    hot: item?.h || 0
  }
}
