/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 23:19:20
 */
import { decode } from '@utils/thirdParty/protobuf'
import { ensureRecordLimit } from '../../cache'
import { logger } from '../../dev'
import { getTimestamp } from '../../index'
import { SEARCH_RESULT_LIMIT, SORT } from '../anime'
import { MUSIC_COLLECTED, MUSIC_NSFW, MUSIC_SORT, MUSIC_TAG_ALIAS, MUSIC_TAGS, MUSIC_YEAR } from './ds'

import type { Finger, Item, Query, SearchResult } from './types'

export { MUSIC_COLLECTED, MUSIC_NSFW, MUSIC_SORT, MUSIC_TAG_ALIAS, MUSIC_TAGS, MUSIC_YEAR }

/** 缓存搜索结果 */
const SEARCH_CACHE: Record<Finger, SearchResult> = {}
let music: Item[] = []
let loaded: boolean = false

/**
 * 标签筛选: 名 → 可命中的 t 集合 (t 为 MUSIC_TAGS 的下标, 下标 0 合法, 别名同组共享)
 */
const TAG_MATCH: Record<string, number[]> = {}
MUSIC_TAGS.forEach((tag, index) => {
  TAG_MATCH[tag] = [index]
})
MUSIC_TAG_ALIAS.forEach(group => {
  const nums = group.filter(tag => tag in TAG_MATCH).map(tag => TAG_MATCH[tag][0])
  if (nums.length < 2) return

  group.forEach(tag => {
    TAG_MATCH[tag] = nums
  })
})

function getData() {
  return music
}

/** 初始化音乐数据 (解码失败按已加载兜底, 避免调用端未捕获 rejection 与反复重解大 bin) */
export async function init() {
  if (loaded) return

  try {
    music = await decode('music')
  } catch (error) {
    logger.error('utils/subject/music', 'init', error)
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
  const { tag, year, x, sort } = query || {}
  if (sort !== '随机' && SEARCH_CACHE[finger]) return SEARCH_CACHE[finger]

  let _list = []
  let yearReg: RegExp
  if (year) {
    yearReg = new RegExp(year === '2000以前' ? '^(2000|1\\d{3})' : `^(${year})`)
  }

  const tagNums = tag ? TAG_MATCH[tag] : undefined
  const data = getData()
  data.forEach((item, index) => {
    let match = true

    if (match && tag) match = !!tagNums?.some(num => item.t?.includes(num))
    if (match && year) match = yearReg.test(item.d)

    // x: '限制' = NSFW, '未知' = 全年龄
    if (match && x) match = x === '限制' ? item.x === 1 : x === '未知' ? !item.x : true

    if (match) _list.push(index)
  })

  switch (sort) {
    case '发行时间':
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
