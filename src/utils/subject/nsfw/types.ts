/*
 * @Author: czy0729
 * @Date: 2024-07-19 21:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-20 11:41:24
 */
import { Loaded } from '@types'

export type Finger = string

export type Query = {
  first: any
  year: any
  sort: any
}

export type Item = {
  i: number
  f?: string
  d?: string
  s?: number
  r?: number
  l?: number
  c?: number
  e?: number
}

export type UnzipItem = {
  id: number
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
  list: UnzipItem[]
  pagination: {
    page: 1
    pageTotal: 1
  }
  _finger: Finger
  _loaded: Loaded
}
