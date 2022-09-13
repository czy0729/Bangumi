/*
 * @Author: czy0729
 * @Date: 2021-05-05 03:29:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-13 21:26:22
 */
import { getTimestamp } from '../../index'
import { getPinYinFirstCharacter } from '../../thirdParty/pinyin'
import { SORT } from './../anime'
import {
  GAME_FIRST,
  GAME_YEAR,
  GAME_PLATFORM,
  GAME_CATE,
  GAME_DEV,
  GAME_DEV_ADV,
  GAME_PUB,
  GAME_SORT,
  GAME_SORT_ADV
} from './ds'
import { Finger, Item, Query, SearchResult, UnzipItem } from './types'
import { SubjectId } from '@types'

export {
  GAME_FIRST,
  GAME_YEAR,
  GAME_PLATFORM,
  GAME_CATE,
  GAME_DEV,
  GAME_DEV_ADV,
  GAME_PUB,
  GAME_SORT,
  GAME_SORT_ADV
}

const SEARCH_CACHE: Record<Finger, SearchResult> = {}
let game: Item[] = []
let loaded: boolean = false

/** OTA 感觉体验不太好，而且容易出错，暂时使用本地版本 */
function getData(): Item[] {
  return game
}

/** 初始化数据 */
export async function init() {
  if (loaded) return

  game = require('@assets/json/thirdParty/game.min.json')
  loaded = true
}

/** 根据 index 选一项 */
export function pick(index: number): UnzipItem {
  init()
  return unzip(getData()[index])
}

/** 根据条目 id 查询一项 */
export function find(id: SubjectId): UnzipItem {
  init()
  return unzip(getData().find(item => item.id == id))
}

/** 只返回下标数组对象 */
export function search(query: Query): SearchResult {
  init()

  // 查询指纹
  const { first, year, platform, cate, dev, pub, sort } = query || {}
  const finger = JSON.stringify(query)

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

    // t: '碧蓝幻想Versus'
    if (match && first) {
      match = first === getPinYinFirstCharacter(item.t)
    }

    // en: '2020-02-06'
    if (match && year) match = yearReg.test(item.en || item.cn)

    // pl: ['PS4', 'PC']
    if (match && platform) match = item.pl?.includes(platform)

    // ta: ['格斗', '角色扮演']
    if (match && cate) {
      match = item.ta?.includes(cate)
    } else if (match && !cate) {
      // ADV 类型的游戏只能在类型选择了的时候才出现
      match = !item.ta?.includes('ADV')
    }

    // ta: ['格斗', '角色扮演']
    if (match && dev) match = item.d?.includes(dev)

    // ta: ['格斗', '角色扮演']
    if (match && pub) match = item.p?.includes(pub)

    if (match) _list.push(index)
  })

  switch (sort) {
    case '发行':
      _list = _list.sort((a, b) => SORT.begin(data[a], data[b], 'en'))
      break

    case '排名':
      _list = _list.sort((a, b) => SORT.rating(data[a], data[b], 'sc', 'r'))
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

/** 转换压缩数据的 key 名 */
export function unzip(item: Item): UnzipItem {
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
    vid: item?.v || 0,
    vgScore: item?.vs || 0,
    vgCount: item?.vc || 0
  }
}
