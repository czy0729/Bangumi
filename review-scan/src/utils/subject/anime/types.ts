/*
 * @Author: czy0729
 * @Date: 2022-09-14 15:04:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-26 03:54:48
 */
import { Loaded } from '@types'

export type Finger = string

export type Query = {
  area: any
  type: any
  year: any
  begin: any
  status: any
  tags: any
  official: any
  sort: any
}

export type Item = {
  i: number
  s?: number
  r?: number
  l?: number
  ty?: string
  t?: number[]
  b?: string
  ar?: any
  st?: number
  o: number[]
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
  total: any
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
