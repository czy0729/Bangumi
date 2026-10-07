/*
 * @Author: czy0729
 * @Date: 2024-07-19 21:46:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 21:45:14
 */
import { decode } from '@utils/thirdParty/protobuf'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { ensureRecordLimit } from '../../cache'
import { logger } from '../../dev'
import { getTimestamp } from '../../index'
import { SEARCH_RESULT_LIMIT, SORT } from '../anime'
import { NSFW_COLLECTED, NSFW_SORT, NSFW_TAGS, NSFW_TYPE, NSFW_YEAR } from './ds'

import type { SubjectId } from '@types'
import type { Finger, Item, Query, SearchResult } from './types'

export { NSFW_COLLECTED, NSFW_SORT, NSFW_TAGS, NSFW_YEAR, NSFW_TYPE }

/**
 * 标签筛选: 名 → 可命中的 tg 集合 (tg 为 NSFW_TAGS 的下标, 下标 0 合法)
 */
const TAG_MATCH: Record<string, number[]> = {}
NSFW_TAGS.forEach((tag, index) => {
  TAG_MATCH[tag] = [index]
})

/** 缓存搜索结果 */
const SEARCH_CACHE: Record<Finger, SearchResult> = {}
let nsfw: Item[] = []
let loaded: boolean = false

function getData() {
  return nsfw
}

/** 初始化 NSFW 数据 (解码失败按已加载兜底, 避免调用端未捕获 rejection 与反复重解大 bin) */
export async function init() {
  if (loaded) return

  try {
    nsfw = await decode('nsfw')
  } catch (error) {
    logger.error('utils/subject/nsfw', 'init', error)
  }
  loaded = true
}

/** 根据 index 选一项 (数据源加载由 store 侧 initData 保证, 此处不触发 init) */
export function pick(index: number): Item {
  return getData()[index]
}

/** 根据条目 id 查询一项 */
export function findNSFW(id: SubjectId): Item {
  init()
  return getData().find(item => item.i == id)
}

/** 只返回下标数组对象 */
export function search(query: Query): SearchResult {
  init()

  // 查询指纹
  const finger = JSON.stringify(query || {})
  const { type, tag, year, sort } = query || {}
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

    if (match && type) match = Number(MODEL_SUBJECT_TYPE.getValue(type)) === item.t
    if (match && tag) match = !!tagNums?.some(num => item.tg?.includes(num))
    if (match && year) match = yearReg.test(item.d)
    if (match) _list.push(index)
  })

  switch (sort) {
    case '上映时间':
      _list = _list.sort((a, b) => SORT.begin(data[a], data[b], 'd'))
      break

    case '排名':
      _list = _list.sort((a, b) => SORT.rating(data[a], data[b], 's', 'r'))
      break

    case '评分人数':
      _list = _list.sort((a, b) => SORT.total(data[a], data[b], 'c'))
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
