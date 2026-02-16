/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:29:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-19 00:16:04
 */
import { SubjectId } from '@types'
import { getTimestamp } from '../../index'
import { decode, get } from '../../protobuf'
import { SORT } from './../anime'
import {
  GAME_CATE,
  GAME_CATE_MAP,
  GAME_COLLECTED,
  GAME_DEV,
  GAME_DEV_MAP,
  GAME_FIRST,
  GAME_PLATFORM,
  GAME_PLATFORM_MAP,
  GAME_PUB,
  GAME_PUB_MAP,
  GAME_SORT,
  GAME_YEAR
} from './ds'
import { Finger, Item, Query, SearchResult, UnzipItem } from './types'

export {
  GAME_CATE,
  GAME_CATE_MAP,
  GAME_COLLECTED,
  GAME_DEV,
  GAME_DEV_MAP,
  GAME_FIRST,
  GAME_PLATFORM,
  GAME_PLATFORM_MAP,
  GAME_PUB,
  GAME_PUB_MAP,
  GAME_SORT,
  GAME_YEAR
}

/** 缓存搜索结果 */
const SEARCH_CACHE: Record<Finger, SearchResult> = {}

let game: Item[] = []

/** v7.1.0 后取消 OTA */
function getData(): Item[] {
  return game
}

/** 初始化数据 */
export async function init() {
  if (game.length) return

  await decode('game')
  game = get('game') || []
}

/** 根据 index 选一项 */
export function pick(index: number): Item {
  init()
  return getData()[index]
}

/** 根据条目 id 查询一项 */
export function findGame(id: SubjectId): Item {
  init()
  return getData().find(item => item.i == id)
}

/** @deprecated根据条目 id 查询一项 */
export function find(id: SubjectId): UnzipItem {
  init()
  return unzip(getData().find(item => item.i == id))
}

/** 只返回下标数组对象 */
export function search(query: Query): SearchResult {
  init()

  // 查询指纹
  const finger = JSON.stringify(query || {})
  const { first, year, platform, cate, dev, pub, sort } = query || {}

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

    // en: '2020-02-06'
    if (match && year) match = yearReg.test(item.en || '0000')

    // pl: ['PS4', 'PC']
    if (match && platform) match = item.pl?.includes(GAME_PLATFORM_MAP[platform])

    // ta: ['格斗', '角色扮演']
    if (match && cate) match = item.ta?.includes(GAME_CATE_MAP[cate])

    // d: ['Nintendo']
    if (match && dev) match = item.d?.includes(GAME_DEV_MAP[dev])

    // p: ['Nintendo']
    if (match && pub) match = item.p?.includes(GAME_PUB_MAP[pub])

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

    case '外网评分':
      _list.sort((a, b) => SORT.score(data[a], data[b], 'vs'))
      break

    case '外网热度':
      _list.sort((a, b) => SORT.score(data[a], data[b], 'vc'))
      break

    case '随机':
      _list = _list.sort(() => SORT.random())
      break

    case '名称':
      _list = _list.sort((a, b) => SORT.name(data[a], data[b], 'f'))
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

/** @deprecated转换压缩数据的 key 名 */
export function unzip(item: any): any {
  return {
    id: item?.id || 0,
    length: item?.l || 0,
    title: item?.t || '',
    sub: item?.s || '',
    cover: item?.c || '',
    tag: item?.ta || [],
    lang: item?.lg || [],
    dev: item?.d || [],
    publish: item?.p || [],
    platform: item?.pl || [],
    time: item?.en || '',
    timeCn: item?.cn || '',
    score: item?.sc || 0,
    rank: item?.r || 0,
    total: item?.o || 0,
    vid: item?.v || 0,
    vgScore: item?.vs || 0,
    vgCount: item?.vc || 0
  }
}
