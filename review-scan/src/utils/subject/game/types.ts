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

export type Item = {
  i: number
  f: string
  en: string
  s?: number
  r?: number
  l: number
  ta: number[]
  d?: number[]
  p?: number[]
  pl: number[]
  vs?: number
  vc?: number
}

/**
 * {
 *   id: 62229,
 *   t: '塞尔达传说 旷野之息',
 *   en: '2017-03-03',
 *   cn: '2018-02-01',
 *   c: '60/d8/62229_SrxX4',
 *   sc: 9.4,
 *   r: 1,
 *   o: 3455,
 *   l: 8,
 *   ta: ['动作', '沙箱', '冒险'],
 *   d: ['Nintendo'],
 *   p: ['Nintendo'],
 *   pl: ['NS', 'WiiU'],
 *   vc: 14843,
 *   vs: 9.8,
 * }
 */
export type UnzipItem = {
  id: number
  t: string
  en: string
  cn: string
  c: string
  sc?: number
  r?: number
  o?: number
  l: number
  ta: string[]
  d: string[]
  p: string[]
  pl: string[]
  vc?: number
  vs?: number
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
