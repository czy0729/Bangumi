/*
 * @Author: czy0729
 * @Date: 2024-07-19 21:31:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:57:26
 */
import type { Loaded } from '@types'
import type { NSFW_SORT, NSFW_TYPE } from './ds'

/** 查询指纹, 由筛选条件序列化得到 */
export type Finger = string

export type Query = {
  type?: (typeof NSFW_TYPE)[number]
  year?: string | number
  sort?: (typeof NSFW_SORT)[number]
}

export type Item = {
  /** 条目 ID */
  i: number

  /** 条目类型, 对应 MODEL_SUBJECT_TYPE 的数值 */
  t?: number

  /** 上映/发售日期 */
  d?: string

  /** 评分 */
  s?: number

  /** 排名 */
  r?: number

  /** 收藏数 */
  l?: number

  /** 评分人数 */
  c?: number

  /** 话数 */
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
