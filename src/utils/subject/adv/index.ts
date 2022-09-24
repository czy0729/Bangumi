/*
 * @Author: czy0729
 * @Date: 2022-09-22 03:34:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-22 04:06:11
 */
import { SubjectId } from '@types'
import { getTimestamp } from '../../index'
import { SORT } from './../anime'
import { ADV_FIRST, ADV_YEAR, ADV_DEV, ADV_DEV_MAP, ADV_SORT } from './ds'
import { Finger, Item, Query, SearchResult, UnzipItem } from './types'

export { ADV_FIRST, ADV_YEAR, ADV_DEV, ADV_DEV_MAP, ADV_SORT }

const SEARCH_CACHE: Record<Finger, SearchResult> = {}
let adv: Item[] = []
let loaded: boolean = false

/** v7.1.0 后取消 OTA */
function getData(): Item[] {
  return adv
}

/** 初始化数据 */
export async function init() {
  if (loaded) return

  adv = require('@assets/json/thirdParty/adv.min.json')
  loaded = true
}

/** 根据 index 选一项 */
export function pick(index: number): Item {
  init()
  return getData()[index]
}

/** 根据条目 id 查询一项 */
export function find(id: SubjectId): UnzipItem {
  init()
  return unzip(getData().find(item => item.i == id))
}

/** 只返回下标数组对象 */
export function search(query: Query): SearchResult {
  init()

  // 查询指纹
  const finger = JSON.stringify(query || {})
  const { first, year, dev, sort } = query || {}

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
    if (match && first) match = item.f !== undefined && first === item.f
    if (match && year) match = yearReg.test(item.en)
    if (match && dev) match = item.d === ADV_DEV_MAP[dev]
    if (match) _list.push(index)
  })

  switch (sort) {
    case '发行':
      _list = _list.sort((a, b) => SORT.begin(data[a], data[b], 'en'))
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

    case '名称':
      _list = _list.sort((a, b) => SORT.name(data[a], data[b], 't'))
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
    length: item?.l || 0,
    title: item?.t || '',
    cover: item?.c || '',
    dev: item?.d || [],
    time: item?.en || '',
    score: item?.sc || 0,
    rank: item?.r || 0,
    total: item?.o || 0
  }
}
