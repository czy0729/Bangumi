/*
 * @Author: czy0729
 * @Date: 2021-01-09 20:07:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-23 22:02:29
 */
import { SubjectId } from '@types'
import { getTimestamp } from '../../index'
import { decode, get } from '../../protobuf'
import { SORT } from '../anime'
import { MANGA_AUTHORS_MAP, MANGA_TAGS_MAP } from './ds'
import { Finger, Item, Query, SearchResult, UnzipItem } from './types'

export {
  MANGA_COLLECTED,
  MANGA_FIRST,
  MANGA_HD,
  MANGA_SORT,
  MANGA_STATUS,
  MANGA_TAGS,
  MANGA_TAGS_MAP,
  MANGA_YEAR
} from './ds'

/** 缓存搜索结果 */
const memo = new Map<Finger, SearchResult>()

let manga: Item[] = []

/** v7.1.0 后已取消 OTA */
function getData() {
  return manga
}

/** 初始化番剧数据 */
export async function init() {
  if (manga.length) return

  await decode('manga')
  manga = get('manga') || []
}

/** 根据 index 选一项 */
export function pick(index: number): Item {
  init()
  return getData()[index]
}

/** 根据条目 id 查询一项 */
export function findManga(id: SubjectId): Item {
  init()
  return getData().find(item => item.i == id)
}

/** @deprecated 根据条目 id 查询一项 */
export function find(id: SubjectId): UnzipItem {
  init()
  return unzip(getData().find(item => item.i == id))
}

/** 只返回下标数组对象 */
export function search(query: Query, max: number = 500): SearchResult {
  init()

  // 查询指纹
  const finger = JSON.stringify(query || {})
  const { year, end, update, status, tags = [], author, sort } = query || {}
  if (sort !== '随机' && memo.has(finger)) return memo.get(finger)

  let list: number[] = []
  let yearReg: RegExp
  if (year) yearReg = new RegExp(year === '2000以前' ? '^(2000|1\\d{3})' : `^(${year})`)

  let endReg: RegExp
  if (end) endReg = new RegExp(end === '2000以前' ? '^(2000|1\\d{3})' : `^(${end})`)

  let updateReg: RegExp
  if (update) updateReg = new RegExp(update === '2000以前' ? '^(2000|1\\d{3})' : `^(${update})`)

  const data = getData()
  data.forEach((item, index) => {
    let match = true

    // 发行
    if (match && year) match = !!item.p && yearReg.test(String(item.p))

    // 结束
    if (match && end) match = !!item.e && endReg.test(String(item.e))

    // 更新
    if (match && update) match = !!item.d && updateReg.test(String(item.d))

    // 状态
    if (match && status) {
      if (status === '连载') {
        match = !item.e && item.u === 1
      } else if (status === '完结') {
        match = !!item.e
      } else {
        match = false
      }
    }

    // 热门作者
    if (match && author) {
      match = 'a' in item && item.a === MANGA_AUTHORS_MAP[author]
    }

    // 类型: '科幻 机战 悬疑 战斗 战争'
    if (match && tags.length) {
      tags.forEach((tag: string) => {
        if (match) match = item.b?.includes(MANGA_TAGS_MAP[tag])
      })
    }

    if (match) list.push(index)
  })

  switch (sort) {
    case '评分':
    case '排名':
      list = list.sort((a, b) => SORT.rating(data[a], data[b], 's', 'r'))
      break

    case '更新时间':
      list = list.sort((a, b) =>
        String(data[b].d || '0000').localeCompare(String(data[a].d || '0000'))
      )
      break

    case '评分人数':
      list = list.sort((a, b) => SORT.total(data[a], data[b], 'l'))
      break

    case '外网热度':
      list = list.sort((a, b) => SORT.total(data[a], data[b], 'h'))
      break

    case '随机':
      list = list.sort(() => SORT.random())
      break

    default:
      break
  }

  const result: SearchResult = {
    list: list.filter((_item, index) => index < max),
    pagination: {
      page: 1,
      pageTotal: 1
    },
    _finger: finger,
    _loaded: getTimestamp()
  }
  memo.set(finger, result)

  return result
}

/** @deprecated 转换压缩数据的 key 名 */
export function unzip(item: any): UnzipItem {
  return {
    id: item?.i || 0,
    mid: item?.m || 0,
    title: item?.t || '',
    image: item?.c || '',
    score: item?.s || 0,
    rank: item?.r || 0,
    total: item?.l || 0,
    ep: item?.e || '',
    author: item?.a || '',
    cates: item?.b || '',
    publish: item?.p || '',
    update: item?.d || '',
    status: item?.u ? 1 : 0,
    hot: item?.h || 0
  }
}
