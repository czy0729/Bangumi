/*
 * @Author: czy0729
 * @Date: 2022-09-14 17:00:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:57:09
 */
import type { Loaded } from '@types'
import type { HENTAI_SORT, HENTAI_TAGS } from './ds'

/** 查询指纹, 由筛选条件序列化得到 */
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
  /** 条目 ID */
  id: number

  /** 番组 id */
  h?: number

  /** 名称首字 */
  f?: string

  /** 中文名 */
  c?: string

  /** 日文名 */
  j?: string

  /** 封面 */
  i?: string

  /** 话数 */
  e?: string

  /** 评分 */
  s?: number

  /** 排名 */
  r?: number

  /** 评分人数 */
  n?: number

  /** 上映日期 */
  a: string

  /** 标签下标, 见 HENTAI_TAGS_MAP */
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
