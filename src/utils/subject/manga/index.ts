/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 */
import { decode } from '@utils/thirdParty/protobuf'
import { ensureRecordLimit } from '../../cache'
import { getTimestamp } from '../../index'
import { SEARCH_RESULT_LIMIT, SORT } from '../anime'
import {
  MANGA_CH,
  MANGA_COLLECTED,
  MANGA_NSFW,
  MANGA_PUBLISHERS,
  MANGA_SORT,
  MANGA_TAG_ALIAS,
  MANGA_TAGS,
  MANGA_VOL,
  MANGA_YEAR
} from './ds'

import type { SubjectId } from '@types'
import type { Finger, Item, Query, SearchResult } from './types'

export {
  MANGA_CH,
  MANGA_COLLECTED,
  MANGA_NSFW,
  MANGA_PUBLISHERS,
  MANGA_SORT,
  MANGA_TAG_ALIAS,
  MANGA_TAGS,
  MANGA_VOL,
  MANGA_YEAR
}

/** 缓存搜索结果 */
const SEARCH_CACHE: Record<Finger, SearchResult> = {}
let manga: Item[] = []
let loaded: boolean = false

/**
 * 标签筛选: 名 → 可命中的 t 集合 (t 为 MANGA_TAGS 的下标, 下标 0 合法, 别名同组共享)
 */
const TAG_MATCH: Record<string, number[]> = {}
MANGA_TAGS.forEach((tag, index) => {
  TAG_MATCH[tag] = [index]
})
MANGA_TAG_ALIAS.forEach(group => {
  const nums = group.filter(tag => tag in TAG_MATCH).map(tag => TAG_MATCH[tag][0])
  if (nums.length < 2) return

  group.forEach(tag => {
    TAG_MATCH[tag] = nums
  })
})

/**
 * 出版社筛选: 名 → 可命中的 p 集合 (p 为 MANGA_PUBLISHERS 的下标, 下标 0 合法)
 */
const PUBLISHER_MATCH: Record<string, number[]> = {}
MANGA_PUBLISHERS.forEach((publisher, index) => {
  PUBLISHER_MATCH[publisher] = [index]
})

/** 卷数 / 话数档位 → [最小值, 最大值] (0 表示无界) */
const VOL_RANGE: Record<string, [number, number]> = {
  '1-5卷': [1, 5],
  '6-10卷': [6, 10],
  '11-20卷': [11, 20],
  '21-50卷': [21, 50],
  '51卷+': [51, 0]
}
const CH_RANGE: Record<string, [number, number]> = {
  '1-20话': [1, 20],
  '21-50话': [21, 50],
  '51-100话': [51, 100],
  '101-300话': [101, 300],
  '300话+': [301, 0]
}

/** 年份匹配 (YYYY[-MM[-DD]] 前缀, '2000以前' 含整个 20 世纪) */
function matchYear(value: string | undefined, year: string | number | undefined) {
  if (!value) return false
  if (year === '2000以前') return /^(2000|1\d{3})/.test(value)
  return new RegExp(`^(${year})`).test(value)
}

/** 档位匹配 */
function matchRange(value: number | undefined, range: [number, number] | undefined) {
  if (!value) return false
  return value >= range[0] && (!range[1] || value <= range[1])
}

function getData() {
  return manga
}

/** 初始化漫画数据 */
export async function init() {
  if (loaded) return

  manga = await decode('manga')
  loaded = true
}

/** 根据 index 选一项 */
export function pick(index: number): Item {
  init()
  return getData()[index]
}

/** 根据条目 id 查询一项 */
export function findManga(id: SubjectId): Item | undefined {
  init()
  return getData().find(item => item.i == id)
}

/** 只返回下标数组对象 */
export function search(query: Query): SearchResult {
  init()

  // 查询指纹
  const finger = JSON.stringify(query || {})
  const { tag, publisher, vol, ch, start, update, end, x, sort } = query || {}
  if (sort !== '随机' && SEARCH_CACHE[finger]) return SEARCH_CACHE[finger]

  let _list = []

  const tagNums = tag ? TAG_MATCH[tag] : undefined
  const publisherNums = publisher ? PUBLISHER_MATCH[publisher] : undefined
  const volRange = vol ? VOL_RANGE[vol] : undefined
  const chRange = ch ? CH_RANGE[ch] : undefined

  const data = getData()
  data.forEach((item, index) => {
    let match = true

    if (match && tag) match = !!tagNums?.some(num => item.t?.includes(num))
    if (match && publisher) match = !!publisherNums?.some(num => item.p?.includes(num))
    if (match && volRange) match = matchRange(item.v, volRange)
    if (match && chRange) match = matchRange(item.c, chRange)
    if (match && start) match = matchYear(item.st || item.d, start)
    if (match && update) match = matchYear(item.ud || item.d, update)
    if (match && end) match = matchYear(item.ed, end)
    if (match && x) match = x === '限制' ? item.x === 1 : x === '未知' ? !item.x : true
    if (match) _list.push(index)
  })

  switch (sort) {
    case '发售时间':
      _list = _list.sort((a, b) => SORT.begin(data[a], data[b], 'd'))
      break

    case '更新时间':
      _list = _list.sort((a, b) => SORT.begin(data[a], data[b], 'ud'))
      break

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

  _list = _list.slice(0, SEARCH_RESULT_LIMIT)

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
  ensureRecordLimit(SEARCH_CACHE, 50)

  return result
}
