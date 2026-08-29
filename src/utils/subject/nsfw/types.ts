/*
 * @Author: czy0729
 * @Date: 2024-07-19 21:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:57:26
 */
import type { Loaded } from '@types'
import type { NSFW_SORT, NSFW_TYPE } from './ds'

export type Finger = string

export type Query = {
  type?: (typeof NSFW_TYPE)[number]
  year?: string | number
  sort?: (typeof NSFW_SORT)[number]
}

export type Item = {
  i: number
  t?: number
  d?: string
  s?: number
  r?: number
  l?: number
  c?: number
  e?: number
}

export type UnzipItem = {
  id: number
  type: 'anime' | 'book' | 'game'
  title: string
  cover: string
  score: number
  total: number
  rank: number
  date: string
  info: string
  collection: number
  eps: number
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
