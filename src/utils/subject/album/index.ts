/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 */
import { decode } from '@utils/thirdParty/protobuf'
import { ensureRecordLimit } from '../../cache'
import { logger } from '../../dev'
import { getTimestamp } from '../../index'
import { SEARCH_RESULT_LIMIT, SORT } from '../anime'
import {
  ALBUM_AUTHORS,
  ALBUM_CATES,
  ALBUM_COLLECTED,
  ALBUM_NSFW,
  ALBUM_PUBLISHERS,
  ALBUM_SORT,
  ALBUM_TAGS,
  ALBUM_YEAR
} from './ds'

import type { Finger, Item, Query, SearchResult } from './types'

export {
  ALBUM_AUTHORS,
  ALBUM_CATES,
  ALBUM_COLLECTED,
  ALBUM_NSFW,
  ALBUM_PUBLISHERS,
  ALBUM_SORT,
  ALBUM_TAGS,
  ALBUM_YEAR
}

/** 缓存搜索结果 */
const SEARCH_CACHE: Record<Finger, SearchResult> = {}
let album: Item[] = []
let loaded: boolean = false

/**
 * 标签筛选: 名 → 可命中的 t 集合 (t 为 ALBUM_TAGS 的下标, 下标 0 合法)
 */
const TAG_MATCH: Record<string, number[]> = {}
ALBUM_TAGS.forEach((tag, index) => {
  TAG_MATCH[tag] = [index]
})

/**
 * 出版社筛选: 名 → 可命中的 p 集合 (p 为 ALBUM_PUBLISHERS 的下标, 下标 0 合法)
 */
const PUBLISHER_MATCH: Record<string, number[]> = {}
ALBUM_PUBLISHERS.forEach((publisher, index) => {
  PUBLISHER_MATCH[publisher] = [index]
})

/**
 * 作者筛选: 名 → 可命中的 a 集合 (a 为 ALBUM_AUTHORS 的下标, 下标 0 合法)
 */
const AUTHOR_MATCH: Record<string, number[]> = {}
ALBUM_AUTHORS.forEach((author, index) => {
  AUTHOR_MATCH[author] = [index]
})

/** 年份匹配 (YYYY[-MM[-DD]] 前缀, '2000以前' 含整个 20 世纪) */
function matchYear(value: string | undefined, year: string | number | undefined) {
  if (!value) return false
  if (year === '2000以前') return /^(2000|1\d{3})/.test(value)
  return new RegExp(`^(${year})`).test(value)
}

function getData() {
  return album
}

/** 初始化画集数据 (解码失败按已加载兜底, 避免调用端未捕获 rejection 与反复重解大 bin) */
export async function init() {
  if (loaded) return

  try {
    album = await decode('album')
  } catch (error) {
    logger.error('utils/subject/album', 'init', error)
  }
  loaded = true
}

/** 根据 index 选一项 (数据源加载由 store 侧 initData 保证, 此处不触发 init) */
export function pick(index: number): Item {
  return getData()[index]
}

/** 只返回下标数组对象 */
export function search(query: Query): SearchResult {
  init()

  // 查询指纹
  const finger = JSON.stringify(query || {})
  const { tag, publisher, author, cate, year, x, sort } = query || {}
  if (sort !== '随机' && SEARCH_CACHE[finger]) return SEARCH_CACHE[finger]

  let _list = []

  const tagNums = tag ? TAG_MATCH[tag] : undefined
  const publisherNums = publisher ? PUBLISHER_MATCH[publisher] : undefined
  const authorNums = author ? AUTHOR_MATCH[author] : undefined
  const cateIndex = cate ? ALBUM_CATES.indexOf(cate as (typeof ALBUM_CATES)[number]) : undefined

  const data = getData()
  data.forEach((item, index) => {
    let match = true

    if (match && tag) match = !!tagNums?.some(num => item.t?.includes(num))
    if (match && publisher) match = !!publisherNums?.some(num => item.p?.includes(num))
    if (match && author) match = !!authorNums?.some(num => item.a?.includes(num))
    if (match && cate) match = typeof cateIndex === 'number' && cateIndex >= 0 && item.c === cateIndex + 1
    if (match && year) match = matchYear(item.d, year)
    if (match && x) match = x === '限制' ? item.x === 1 : x === '未知' ? !item.x : true
    if (match) _list.push(index)
  })

  switch (sort) {
    case '发售时间':
      _list = _list.sort((a, b) => SORT.begin(data[a], data[b], 'd'))
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
