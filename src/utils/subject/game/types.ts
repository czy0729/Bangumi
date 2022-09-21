/*
 * @Author: czy0729
 * @Date: 2022-09-13 21:10:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-13 21:26:37
 */
import { Loaded } from '@types'

export type Finger = string

export type Query = {
  first: any
  year: any
  platform: any
  cate: any
  dev: any
  pub: any
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
  l: any
  t: any
  s: any
  c: any
  ta: any
  lg: any
  d: any
  p: any
  pl: any
  en: any
  cn: any
  sc: any
  r: any
  o: any
  v: any
  vs: any
  vc: any
}

export type UnzipItem = {
  id: any
  length: any
  title: any
  sub: any
  cover: any
  tag: any
  lang: any
  dev: any
  publish: any
  platform: any
  time: any
  timeCn: any
  score: any
  rank: any
  total: any
  vid: any
  vgScore: any
  vgCount: any
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
