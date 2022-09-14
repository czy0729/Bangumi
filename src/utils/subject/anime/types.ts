/*
 * @Author: czy0729
 * @Date: 2022-09-14 15:04:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-14 15:16:16
 */
import { Loaded } from '@types'

export type Finger = string

export type Query = {
  area: any
  type: any
  first: any
  year: any
  begin: any
  status: any
  tags: any
  official: any
  sort: any
}

/**
 * 转换压缩数据的 key 名
 * {
 *   t: '碧蓝幻想Versus',
 *   l: 13,
 *   s: 'グランブルーファンタジー ヴァーサス',
 *   vs: 8.1,
 *   vc: 102,
 *   ta: ['格斗', '角色扮演'],
 *   la: ['简中'],
 *   d: ['Arc System Works'],
 *   p: ['Cygames', 'SEGA'],
 *   pl: ['PS4', 'PC'],
 *   cn: '2020-02-06',
 *   en: '2020-02-06',
 *   id: 269406,
 *
 *   // 可能没有的键值, 使用默认值
 *   sc: 6.5,
 *   r: 4023
 * }
 */
export type Item = {
  id: any
  a: any
  o: any
  t: any
  e: any
  c: any
  j: any
  i: any
  b: any
  s?: any
  r?: any
  st?: any
  ty?: any
  ar?: any
}

export type UnzipItem = {
  id: any
  ageId: any
  type: any
  area: any
  status: any
  official: any
  tags: any
  ep: any
  cn: any
  jp: any
  image: any
  begin: any
  score: any
  rank: any
}

export type SearchResult = {
  list: UnzipItem[]
  pagination: {
    page: 1
    pageTotal: 1
  }
  _finger: Finger
  _loaded: Loaded
}
