/*
 * @Author: czy0729
 * @Date: 2020-07-15 00:12:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-20 01:23:44
 */
import { SubjectId } from '@types'
import { getTimestamp } from '../../index'
import {
  SORT,
  REG_SEASONS,
  ANIME_AREA,
  ANIME_TYPE,
  ANIME_FIRST,
  ANIME_YEAR,
  ANIME_BEGIN,
  ANIME_STATUS,
  ANIME_TAGS,
  ANIME_TAGS_MAP,
  ANIME_OFFICIAL,
  ANIME_OFFICIAL_MAP,
  ANIME_SORT
} from './ds'
import { Finger, Item, Query, SearchResult, UnzipItem } from './types'

export {
  SORT,
  REG_SEASONS,
  ANIME_AREA,
  ANIME_TYPE,
  ANIME_FIRST,
  ANIME_YEAR,
  ANIME_BEGIN,
  ANIME_STATUS,
  ANIME_TAGS,
  ANIME_TAGS_MAP,
  ANIME_OFFICIAL,
  ANIME_OFFICIAL_MAP,
  ANIME_SORT
}

const SEARCH_CACHE: Record<Finger, SearchResult> = {}
let anime: Item[] = []
let loaded: boolean = false

/** v7.1.0 后取消 OTA */
function getData() {
  return anime
}

/** 初始化番剧数据 */
export async function init() {
  if (loaded) return

  anime = require('@assets/json/thirdParty/anime.min.json')
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
  const {
    area,
    type,
    first,
    year,
    begin,
    status,
    tags = [],
    official,
    sort
  } = query || {}

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

    // area: 'jp'
    if (match && area) {
      match =
        ((item.ar || 'jp') === 'jp' && area === '日本') ||
        ((item.ar || 'jp') === 'cn' && area === '中国')
    }

    // type: 'TV'
    if (match && type) match = (item.ty || 'TV') === type

    if (match && first) match = first === item.f

    // begin: '2008-04-06'
    if (match && year) match = yearReg.test(item.b || '')
    if (match && begin) {
      if (!item.b) {
        match = false
      } else {
        const splits = item.b.split('-')

        if (!splits[1]) {
          match = false
        } else {
          match = REG_SEASONS[begin]?.test(`${splits[0]}-${splits[1]}-`)
        }
      }
    }

    // status: undefined | 1 | 2
    if (match && status) {
      if (item.st === undefined) {
        match = status === '完结'
      } else if (item.st === 1) {
        match = status === '连载'
      } else if (item.st === 2) {
        match = status === '未播放'
      }
    }

    // tags: '科幻 机战 悬疑 战斗 战争'
    if (match && tags.length) {
      tags.forEach((tag: string) => {
        if (match) match = item.t?.includes(ANIME_TAGS_MAP[tag])
      })
    }

    if (match && official) {
      match = item.o?.includes(ANIME_OFFICIAL_MAP[official])
    }

    if (match) _list.push(index)
  })

  switch (sort) {
    case '上映时间':
      _list = _list.sort((a, b) => SORT.begin(data[a], data[b], 'b'))
      break

    case '名称':
      _list = _list.sort((a, b) => SORT.name(data[a], data[b], 'f'))
      break

    case '评分':
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
    ageId: item?.a || 0,
    type: item?.ty || 'TV',
    area: item?.ar || 'jp',
    status: item?.st || '完结',
    official: item?.o || '',
    tags: item?.t || '',
    ep: item?.e || '',
    cn: item?.c || '',
    jp: item?.j || '',
    image: item?.i || '',
    begin: item?.b || '',
    score: item?.s || 0,
    rank: item?.r || 0,
    total: item?.l || 0
  }
}

/** 条目不同状态对应分值 */
const STATUS_RATE = {
  想看: 3,
  在看: 2,
  看过: 1,
  搁置: -5,
  抛弃: -10
} as const

/**
 * 猜你喜欢
 *  - 用户所有动画收藏
 *  - 动画标签
 *  - 动画排行/评分
 *  - 最近操作记录
 */
export function guess(
  userCollectionsMap = {},
  reverse: boolean = false
  // skipIds = []
) {
  const rates = {}
  Object.keys(userCollectionsMap).forEach(id => {
    const subject = find(id)
    if (subject.id && subject.tags) {
      const type = userCollectionsMap[id]
      subject.tags.split(' ').forEach(tag => {
        if (!(tag in rates)) {
          rates[tag] = 0
        }
        rates[tag] += STATUS_RATE[type]
      })
    }
  })

  const data = getData()
  return (
    data
      .map((item, index) => {
        if (userCollectionsMap[item.i]) {
          return [index, reverse ? 100000 : 0]
        }

        let rate = 0
        String(item.t || '')
          .split(' ')
          .sort((a, b) => rates[b] - rates[a])
          .filter((item, index) => index < 3)
          .forEach(tag => {
            rate += rates[tag] || 0
          })
        rate *= item.r ? item.s || 0 : 0

        if (item.b) {
          const y = Number(item.b.slice(0, 4))
          if (!Number.isNaN(y)) {
            rate *= 0.98 ** Math.min(2021 - y, 10)
          } else {
            rate *= 0.98 ** 10
          }
        } else {
          rate *= 0.98 ** 10
        }

        return [index, Math.floor(rate)]
      })
      .sort((a, b) => (reverse ? a[1] - b[1] : b[1] - a[1]))
      // .filter(item => !skipIds.includes(item.id))
      .filter((item, index) => index < 500)
      .map(item => ({
        ...unzip(data[item[0]]),
        rate: item[1]
      }))
  )
  // .sort(() => SORT.random())
}
