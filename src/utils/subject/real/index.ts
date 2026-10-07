/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 00:00:00
 */
import { decode } from '@utils/thirdParty/protobuf'
import { ensureRecordLimit } from '../../cache'
import { logger } from '../../dev'
import { getTimestamp } from '../../index'
import { SEARCH_RESULT_LIMIT, SORT } from '../anime'
import { REAL_COLLECTED, REAL_FORM, REAL_NSFW, REAL_REGION, REAL_SORT, REAL_TAGS, REAL_YEAR } from './ds'

import type { SubjectId } from '@types'
import type { Finger, Item, Query, SearchResult } from './types'

export { REAL_COLLECTED, REAL_FORM, REAL_NSFW, REAL_REGION, REAL_SORT, REAL_TAGS, REAL_YEAR }

/** 缓存搜索结果 */
const SEARCH_CACHE: Record<Finger, SearchResult> = {}
let real: Item[] = []
let loaded: boolean = false

/** 标签名 → bin 的 t 下标 (下标 0 合法, 不可用 indexOf 真值判断) */
const TAG_INDEX_MAP = new Map<string, number>(REAL_TAGS.map((tag, index) => [tag, index]))

/** 筛选值 → bin 的 g / f (1-based; 「其他」匹配缺席值) */
const REGION_INDEX_MAP = new Map<string, number>(REAL_REGION.map((name, index) => [name, index]))
const FORM_INDEX_MAP = new Map<string, number>(REAL_FORM.map((name, index) => [name, index]))

/** g / f 维度匹配: 「其他」命中缺席 (proto3 默认值编码后缺席), 其余按下标 + 1 */
function matchIndexed(value: number | undefined, name: string, map: Map<string, number>) {
  const index = map.get(name)
  if (typeof index !== 'number') return false
  if (index === map.size - 1) return !value
  return value === index + 1
}

function getData() {
  return real
}

/** 初始化三次元数据 (解码失败按已加载兜底, 避免调用端未捕获 rejection 与反复重解大 bin) */
export async function init() {
  if (loaded) return

  try {
    real = await decode('real')
  } catch (error) {
    logger.error('utils/subject/real', 'init', error)
  }
  loaded = true
}

/** 根据 index 选一项 (数据源加载由 store 侧 initData 保证, 此处不触发 init) */
export function pick(index: number): Item {
  return getData()[index]
}

/** 根据条目 id 查询一项 */
export function findReal(id: SubjectId): Item {
  init()
  return getData().find(item => item.i == id)
}

/** 只返回下标数组对象 */
export function search(query: Query): SearchResult {
  init()

  // 查询指纹
  const finger = JSON.stringify(query || {})
  const { tag, region, form, year, x, sort } = query || {}
  if (sort !== '随机' && SEARCH_CACHE[finger]) return SEARCH_CACHE[finger]

  let _list = []
  let yearReg: RegExp
  if (year) {
    yearReg = new RegExp(year === '2000以前' ? '^(2000|1\\d{3})' : `^(${year})`)
  }

  const tagIndex = tag ? TAG_INDEX_MAP.get(tag) : undefined
  const data = getData()
  data.forEach((item, index) => {
    let match = true

    if (match && tag) match = typeof tagIndex === 'number' && !!item.t?.includes(tagIndex)
    if (match && region) match = matchIndexed(item.g, region, REGION_INDEX_MAP)
    if (match && form) match = matchIndexed(item.f, form, FORM_INDEX_MAP)
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
