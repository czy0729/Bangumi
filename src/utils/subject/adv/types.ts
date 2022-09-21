/*
 * @Author: czy0729
 * @Date: 2022-09-22 03:34:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-22 03:48:28
 */
import { Loaded } from '@types'

export type Finger = string

export type Query = {
  first: any
  year: any
  dev: any
  sort: any
}

export type Item = {
  t: any
  l: any
  d: any
  en: any
  id: any
  c: any
  sc: any
  r: any
  o: any
}

export type UnzipItem = {
  title: any
  length: any
  dev: any
  time: any
  id: any
  cover: any
  score: any
  rank: any
  total: any
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
