/*
 * @Author: czy0729
 * @Date: 2022-09-22 03:34:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:56:06
 */
import type { Loaded } from '@types'
import type { ADV_DEV, ADV_SORT } from './ds'

/** 查询指纹, 由筛选条件序列化得到 */
export type Finger = string

export type Query = {
  first?: string
  year?: string | number

  /** 开发商, 空串表示未筛选 */
  dev?: '' | (typeof ADV_DEV)[number]
  playtime?: string
  cn?: string

  /** 分级筛选 */
  x?: string
  sort?: (typeof ADV_SORT)[number]
}

export type Item = {
  /** 条目 ID */
  i: number

  /** 名称首字 */
  f?: string

  /** 发行日期 */
  en: string

  /** 评分 */
  s?: number

  /** 排名 */
  r?: number

  /** 评分人数 */
  l?: number

  /** 开发商序号 (1-based, 0/缺席 = 无开发商; proto3 默认值语义) */
  d?: number

  /** 时长档位, 见 ADV_PLAYTIME_MAP */
  t?: 1 | 2 | 3 | 4 | 5

  /** 是否有汉化 */
  cn?: number

  /** 敏感标记 (1 = NSFW, 0/缺席 = 全年龄) */
  x?: number
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
  /** 匹配条目在数据源中的排序下标 */
  list: number[]
  pagination: {
    page: 1
    pageTotal: 1
  }
  _finger: Finger
  _loaded: Loaded
}
