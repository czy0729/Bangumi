/*
 * @Author: czy0729
 * @Date: 2022-09-14 17:00:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-14 17:11:45
 */
import { Loaded } from '@types'

export type Finger = string

export type Query = {
  first: any
  year: any
  chara: any
  job: any
  body: any
  content: any
  sort: any
}

/**
 * 转换压缩数据的key名
 * @param {*} item
 * {
 *   id: 25469,
 *   h: 22824,
 *   c: '风筝',
 *   j: 'A KITE',
 *   i: 'b5/75/25469_APhI3',
 *   n: 1247,
 *   a: '1998-02-25',
 *   e: 2,
 *
 *   // 可能没有的键值, 使用默认值
 *   [s: 7.6]
 *   [r: 766]
 *   [t: [13,73,54,26,41,78,48,53,55,1,50,10]]
 * }
 */
export type Item = {
  id: any
  h: any
  c: any
  j: any
  i: any
  a: any
  e: any
  s?: any
  r?: any
  n?: any
  t?: any
}

export type UnzipItem = {
  id: any
  hId: any
  cn: any
  jp: any
  image: any
  air: any
  ep: any
  score: any
  rank: any
  total: any
  tags: any
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
