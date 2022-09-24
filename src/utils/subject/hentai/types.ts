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

export type Item = {
  id: number
  f?: string
  s?: number
  r?: number
  n?: number
  a: string
  t: number[]
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
