/*
 * @Author: czy0729
 * @Date: 2022-09-13 21:10:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:57:00
 */
import type { Loaded } from '@types'
import type { GAME_CATE, GAME_DEV, GAME_PLATFORM, GAME_PUB, GAME_SORT } from './ds'

export type Finger = string

export type Query = {
  first?: string
  year?: string | number
  platform?: (typeof GAME_PLATFORM)[number]
  cate?: (typeof GAME_CATE)[number]
  dev?: (typeof GAME_DEV)[number]
  pub?: (typeof GAME_PUB)[number]
  sort?: (typeof GAME_SORT)[number]
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

/** @deprecated 原始压缩数据（unzip 专用） */
export type CompressedItem = {
  id?: number
  l?: number
  t?: string
  s?: string
  c?: string
  ta?: number[]
  lg?: number[]
  d?: number[]
  p?: number[]
  pl?: number[]
  en?: string
  cn?: string
  sc?: number
  r?: number
  o?: number
  v?: number
  vs?: number
  vc?: number
}

/** @deprecated 解压后的可读数据 */
export type GameUnzipItem = {
  id: number
  length: number
  title: string
  sub: string
  cover: string
  tag: string[]
  lang: string[]
  dev: string[]
  publish: string[]
  platform: string[]
  time: string
  timeCn: string
  score: number
  rank: number
  total: number
  vid: number
  vgScore: number
  vgCount: number
}

export type SearchResult = {
  list: number[]
  pagination: {
    page: 1
    pageTotal: 1
  }
  _finger: Finger
  _loaded: Loaded
}
