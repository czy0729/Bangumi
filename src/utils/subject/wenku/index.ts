/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 */
import { decode } from '@utils/thirdParty/protobuf'
import { ensureRecordLimit } from '../../cache'
import { logger } from '../../dev'
import { getTimestamp } from '../../index'
import { SEARCH_RESULT_LIMIT, SORT } from '../anime'
import {
  WENKU_ANIME,
  WENKU_AUTHORS,
  WENKU_CATES,
  WENKU_COLLECTED,
  WENKU_NSFW,
  WENKU_PUBLISHERS,
  WENKU_SORT,
  WENKU_TAGS,
  WENKU_VOL,
  WENKU_YEAR
} from './ds'

import type { SubjectId } from '@types'
import type { Finger, Item, Query, SearchResult } from './types'

export {
  WENKU_ANIME,
  WENKU_AUTHORS,
  WENKU_CATES,
  WENKU_COLLECTED,
  WENKU_NSFW,
  WENKU_PUBLISHERS,
  WENKU_SORT,
  WENKU_TAGS,
  WENKU_VOL,
  WENKU_YEAR
}

/** 缓存搜索结果 */
const SEARCH_CACHE: Record<Finger, SearchResult> = {}
let wenku: Item[] = []
let loaded: boolean = false

/**
 * 标签筛选: 名 → 可命中的 t 集合 (t 为 WENKU_TAGS 的下标, 下标 0 合法)
 */
const TAG_MATCH: Record<string, number[]> = {}
WENKU_TAGS.forEach((tag, index) => {
  TAG_MATCH[tag] = [index]
})

/**
 * 出版社筛选: 名 → 可命中的 p 集合 (p 为 WENKU_PUBLISHERS 的下标, 下标 0 合法)
 */
const PUBLISHER_MATCH: Record<string, number[]> = {}
WENKU_PUBLISHERS.forEach((publisher, index) => {
  PUBLISHER_MATCH[publisher] = [index]
})

/**
 * 作者筛选: 名 → 可命中的 a 集合 (a 为 WENKU_AUTHORS 的下标, 下标 0 合法)
 */
const AUTHOR_MATCH: Record<string, number[]> = {}
WENKU_AUTHORS.forEach((author, index) => {
  AUTHOR_MATCH[author] = [index]
})

/** 卷数档位 → [最小值, 最大值] (0 表示无界) */
const VOL_RANGE: Record<string, [number, number]> = {
  '1-5卷': [1, 5],
  '6-10卷': [6, 10],
  '11-20卷': [11, 20],
  '21-50卷': [21, 50],
  '51卷+': [51, 0]
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
  return wenku
}

/** 初始化文库数据 (解码失败按已加载兜底, 避免调用端未捕获 rejection 与反复重解大 bin) */
export async function init() {
  if (loaded) return

  try {
    wenku = await decode('wenku')
  } catch (error) {
    logger.error('utils/subject/wenku', 'init', error)
  }
  loaded = true
}

/** 根据 index 选一项 (数据源加载由 store 侧 initData 保证, 此处不触发 init) */
export function pick(index: number): Item {
  return getData()[index]
}

/** 根据条目 id 查询一项 */
export function findWenku(id: SubjectId): Item | undefined {
  init()
  return getData().find(item => item.i == id)
}

/** 只返回下标数组对象 */
export function search(query: Query): SearchResult {
  init()

  // 查询指纹
  const finger = JSON.stringify(query || {})
  const { tag, publisher, author, cate, vol, start, update, end, x, anime, sort } = query || {}
  if (sort !== '随机' && SEARCH_CACHE[finger]) return SEARCH_CACHE[finger]

  let _list = []

  const tagNums = tag ? TAG_MATCH[tag] : undefined
  const publisherNums = publisher ? PUBLISHER_MATCH[publisher] : undefined
  const authorNums = author ? AUTHOR_MATCH[author] : undefined
  const cateIndex = cate ? WENKU_CATES.indexOf(cate as (typeof WENKU_CATES)[number]) : undefined
  const volRange = vol ? VOL_RANGE[vol] : undefined

  const data = getData()
  data.forEach((item, index) => {
    let match = true

    if (match && tag) match = !!tagNums?.some(num => item.t?.includes(num))
    if (match && publisher) match = !!publisherNums?.some(num => item.p?.includes(num))
    if (match && author) match = !!authorNums?.some(num => item.a?.includes(num))
    if (match && cate) match = typeof cateIndex === 'number' && cateIndex >= 0 && item.c === cateIndex + 1
    if (match && volRange) match = matchRange(item.v, volRange)
    if (match && start) match = matchYear(item.st || item.d, start)
    if (match && update) match = matchYear(item.ud || item.d, update)
    if (match && end) match = matchYear(item.ed, end)
    if (match && x) match = x === '限制' ? item.x === 1 : x === '未知' ? !item.x : true
    if (match && anime) match = anime === '是' ? item.m === 1 : !item.m
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
