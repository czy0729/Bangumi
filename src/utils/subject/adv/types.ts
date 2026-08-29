/*
 * @Author: czy0729
 * @Date: 2022-09-22 03:34:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:56:06
 */
import type { Loaded } from '@types'
import type { ADV_DEV, ADV_SORT } from './ds'

export type Finger = string

export type Query = {
  first?: string
  year?: string | number
  dev?: (typeof ADV_DEV)[number]
  playtime?: string
  cn?: string
  sort?: (typeof ADV_SORT)[number]
}

export type Item = {
  i: number
  f?: string
  en: string
  s?: number
  r?: number
  l?: number
  d: number
  t?: 1 | 2 | 3 | 4 | 5
  cn?: number
}

/** @deprecated 原始压缩数据（unzip 专用） */
export type CompressedItem = {
  id?: number
  l?: number
  t?: string
  c?: string
  d?: number
  en?: string
  sc?: number
  r?: number
  o?: number
}

export type UnzipItem = {
  title: string
  length: number
  dev: number
  time: string
  id: number
  cover: string
  score: number
  rank: number
  total: number
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
