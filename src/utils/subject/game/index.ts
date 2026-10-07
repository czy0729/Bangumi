/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:29:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-17 05:40:10
 */
import { ensureRecordLimit } from '../../cache'
import { getTimestamp } from '../../index'
import { decode, get } from '../../thirdParty/protobuf'
import { SEARCH_RESULT_LIMIT, SORT } from '../anime'
import {
  GAME_CATE,
  GAME_CATE_MAP,
  GAME_COLLECTED,
  GAME_DEV,
  GAME_DEV_ALIAS,
  GAME_DEV_MAP,
  GAME_JUNK,
  GAME_NSFW,
  GAME_PLATFORM,
  GAME_PLATFORM_MAP,
  GAME_PUB,
  GAME_PUB_ALIAS,
  GAME_PUB_MAP,
  GAME_SORT,
  GAME_TAGS,
  GAME_YEAR
} from './ds'

import type { SubjectId } from '@types'
import type { CompressedItem, Finger, GameUnzipItem, Item, Query, SearchResult } from './types'

export {
  GAME_CATE,
  GAME_CATE_MAP,
  GAME_COLLECTED,
  GAME_DEV,
  GAME_DEV_ALIAS,
  GAME_DEV_MAP,
  GAME_JUNK,
  GAME_NSFW,
  GAME_PLATFORM,
  GAME_PLATFORM_MAP,
  GAME_PUB,
  GAME_PUB_ALIAS,
  GAME_PUB_MAP,
  GAME_SORT,
  GAME_TAGS,
  GAME_YEAR
}

/** 开发商筛选: 名 → 可命中的 d 集合 (d 为 GAME_DEV 的下标), 别名同组共享 */
const DEV_MATCH: Record<string, number[]> = {}
Object.keys(GAME_DEV_MAP).forEach(name => {
  DEV_MATCH[name] = [GAME_DEV_MAP[name]]
})
GAME_DEV_ALIAS.forEach(group => {
  const nums = group.filter(name => name in GAME_DEV_MAP).map(name => GAME_DEV_MAP[name])
  if (nums.length < 2) return

  group.forEach(name => {
    DEV_MATCH[name] = nums
  })
})

/** 发行商筛选: 名 → 可命中的 p 集合 (p 为 GAME_PUB 的下标), 别名同组共享 */
const PUB_MATCH: Record<string, number[]> = {}
Object.keys(GAME_PUB_MAP).forEach(name => {
  PUB_MATCH[name] = [GAME_PUB_MAP[name]]
})
GAME_PUB_ALIAS.forEach(group => {
  const nums = group.filter(name => name in GAME_PUB_MAP).map(name => GAME_PUB_MAP[name])
  if (nums.length < 2) return

  group.forEach(name => {
    PUB_MATCH[name] = nums
  })
})

/** 缓存搜索结果 */
const SEARCH_CACHE: Record<Finger, SearchResult> = {}

/** 标签筛选: 名 → bin 的 tg 下标 (下标 0 合法, 不可用 indexOf 真值判断) */
const GAME_TAG_MATCH: Record<string, number> = {}
GAME_TAGS.forEach((tag, index) => {
  GAME_TAG_MATCH[tag] = index
})

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

/** @deprecated 根据条目 id 查询一项 */
export function find(id: SubjectId): GameUnzipItem {
  init()
  return unzip(getData().find(item => item.i == id) as unknown as CompressedItem | undefined)
}

/** 只返回下标数组对象 */
export function search(query: Query): SearchResult {
  init()

  // 查询指纹
  const finger = JSON.stringify(query || {})
  const { year, platform, cate, dev, pub, tag, x, sort } = query || {}

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

    // en: '2020-02-06'
    if (match && year) match = yearReg.test(item.en || '0000')

    // pl: ['PS4', 'PC']
    if (match && platform) match = item.pl?.includes(GAME_PLATFORM_MAP[platform])

    // ta: ['格斗', '角色扮演']
    if (match && cate) match = item.ta?.includes(GAME_CATE_MAP[cate])

    // tg: 标签下标 (见 GAME_TAGS, 下标 0 合法)
    const tagIndex = tag ? GAME_TAG_MATCH[tag] : undefined
    if (match && tag) match = typeof tagIndex === 'number' && !!item.tg?.includes(tagIndex)

    // d: ['Nintendo']
    if (match && dev) match = DEV_MATCH[dev]?.some(num => item.d?.includes(num)) ?? false

    // p: ['Nintendo']
    if (match && pub) match = PUB_MATCH[pub]?.some(num => item.p?.includes(num)) ?? false

    // x: '限制' = NSFW, '未知' = 全年龄
    if (match && x) match = x === '限制' ? item.x === 1 : x === '未知' ? !item.x : true

    if (match) _list.push(index)
  })

  switch (sort) {
    case '发行时间':
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

/** @deprecated转换压缩数据的 key 名 */
export function unzip(item: CompressedItem | undefined): GameUnzipItem {
  return {
    id: item?.id || 0,
    length: item?.l || 0,
    title: item?.t || '',
    sub: item?.s || '',
    cover: item?.c || '',
    tag: item?.ta?.map(String) || [],
    lang: item?.lg?.map(String) || [],
    dev: item?.d?.map(String) || [],
    publish: item?.p?.map(String) || [],
    platform: item?.pl?.map(String) || [],
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
