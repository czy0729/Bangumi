/*
 * @Author: czy0729
 * @Date: 2020-09-02 18:26:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-21 01:05:12
 */
import { SubjectId } from '@types'
import { getTimestamp } from '../../index'
import { getPinYinFirstCharacter } from '../../thirdParty/pinyin'
import { SORT } from '../anime'
import {
  WENKU_FIRST,
  WENKU_YEAR,
  WENKU_STATUS,
  WENKU_ANIME,
  WENKU_CATE,
  WENKU_AUTHOR,
  WENKU_SORT,
  WENKU_TAGS_MAP,
  WENKU_TAGS
} from './ds'
import { Finger, Item, Query, SearchResult, UnzipItem } from './types'

export {
  WENKU_FIRST,
  WENKU_YEAR,
  WENKU_STATUS,
  WENKU_ANIME,
  WENKU_CATE,
  WENKU_AUTHOR,
  WENKU_SORT,
  WENKU_TAGS_MAP,
  WENKU_TAGS
}

const SEARCH_CACHE: Record<Finger, SearchResult> = {}
let wenku: Item[] = []
let loaded: boolean = false

/** v7.1.0 后取消 OTA */
function getData() {
  return wenku
}

/** 初始化文库数据 */
export async function init() {
  if (loaded) return

  wenku = require('@assets/json/thirdParty/wenku.min.json')
  loaded = true
}

/** 只返回下标数组对象 */
export function search(query: Query): SearchResult {
  init()

  // 查询指纹
  const finger = JSON.stringify(query || {})
  const { sort, year, first, status, anime, cate, author, tags } = query || {}
  if (sort !== '随机' && SEARCH_CACHE[finger]) return SEARCH_CACHE[finger]

  let _list = []
  let yearReg: RegExp
  if (year) yearReg = new RegExp(year === '2000以前' ? '^(2000|1\\d{3})' : `^(${year})`)

  const data = getData()
  data.forEach((item, index) => {
    let match = true

    // cn: '云之彼端约定之地'
    if (match && first) match = first === getPinYinFirstCharacter(item.t)

    // begin: 2009
    if (match && year) match = yearReg.test(item.b || item.u || '')

    // status: 1
    if (match && status) match = status === '连载' ? item.v === 1 : !item.v

    // tags: '科幻 机战 悬疑 战斗 战争'
    if (match && tags.length) {
      tags.forEach((tag: string) => {
        if (match) match = item.j?.includes(tag)
      })
    }

    // anime: 1, 是否动画化
    if (match && anime) match = anime === '是' ? item.m === 1 : !item.m
    if (match && author) match = item.a === author
    if (match && cate) {
      if (cate === '其他文库') {
        match = item.c === undefined
      } else {
        match = item.c === cate
      }
    }
    if (match) _list.push(index)
  })

  switch (sort) {
    case '发行':
      _list = _list.sort((a, b) =>
        String(data[b].b || data[b].u || '').localeCompare(data[a].b || data[a].u || '')
      )
      break

    case '更新':
      _list = _list.sort((a, b) => {
        return String(data[b].u || '').localeCompare(String(data[a].u || ''))
      })
      break

    case '名称':
      _list = _list.sort((a, b) => SORT.name(data[a], data[b], 't'))
      break

    case '评分':
    case '排名':
      _list = _list.sort((a, b) => SORT.rating(data[a], data[b], 's', 'r'))
      break

    case '热度':
      _list = _list.sort((a, b) => {
        if (data[a].h === data[b].h) return (data[b].s || 0) - (data[a].s || 0)
        return data[b].h - data[a].h
      })
      break

    case '趋势':
      _list = _list.sort((a, b) => {
        if (data[a].p === data[b].p) return (data[b].s || 0) - (data[a].s || 0)
        return (data[b].p || 0) - (data[a].p || 0)
      })
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

/** 根据 index 选一项 */
export function pick(index: number): UnzipItem {
  init()
  return unzip(getData()[index])
}

/** 根据条目 id 查询一项 */
export function find(id: SubjectId): UnzipItem {
  init()
  return unzip(getData().find(item => item.i == id))
}

/** 转换压缩数据的 key 名 */
export function unzip(item: Item) {
  return {
    id: item?.i || 0,
    wenkuId: item?.w || 0,
    status: item?.v || 0,
    anime: item?.m || 0,
    author: item?.a || '',
    ep: item?.e || '',
    cn: item?.t || '',
    // jp: item?.j || '',
    image: item?.o || '',
    begin: item?.b || '',
    update: item?.u || '',
    cate: item?.c || '',
    hot: item?.h || 0,
    up: item?.p || 0,
    len: item?.l || '',
    score: item?.s || 0,
    rank: item?.r || 0,
    total: item?.k || 0,
    tags: item?.j || 0
  }
}
