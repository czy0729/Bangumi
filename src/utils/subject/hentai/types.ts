/*
 * @Author: czy0729
 * @Date: 2022-09-14 17:00:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:57:09
 */
import type { Loaded } from '@types'
import type { HENTAI_SORT, HENTAI_TAGS } from './ds'

export type Finger = string

export type Query = {
  first?: string
  year?: string | number
  chara?: (typeof HENTAI_TAGS)[number]
  job?: (typeof HENTAI_TAGS)[number]
  body?: (typeof HENTAI_TAGS)[number]
  content?: (typeof HENTAI_TAGS)[number]
  sort?: (typeof HENTAI_SORT)[number]
}

export type Item = {
  id: number
  h?: number
  f?: string
  c?: string
  j?: string
  i?: string
  e?: string
  s?: number
  r?: number
  n?: number
  a: string
  t: number[]
}

export type UnzipItem = {
  id: number
  hId: number
  cn: string
  jp: string
  image: string
  air: string
  ep: string
  score: number
  rank: number
  total: number
  tags: number[]
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
