/*
 * @Author: czy0729
 * @Date: 2022-09-13 21:10:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:57:00
 */
import type { Loaded } from '@types'
import type { GAME_CATE, GAME_DEV, GAME_NSFW, GAME_PLATFORM, GAME_PUB, GAME_SORT, GAME_TAGS } from './ds'

/** 查询指纹, 由筛选条件序列化得到 */
export type Finger = string

export type Query = {
  year?: string | number

  /** 平台, 空串表示未筛选 */
  platform?: '' | (typeof GAME_PLATFORM)[number]

  /** 类型, 空串表示未筛选 */
  cate?: '' | (typeof GAME_CATE)[number]

  /** 标签, 空串表示未筛选 */
  tag?: '' | (typeof GAME_TAGS)[number]

  /** 开发商, 空串表示未筛选 */
  dev?: '' | (typeof GAME_DEV)[number]

  /** 发行商, 空串表示未筛选 */
  pub?: '' | (typeof GAME_PUB)[number]

  /** 分级 ('限制' = NSFW, '未知' = 全年龄, 空串表示未筛选) */
  x?: '' | (typeof GAME_NSFW)[number]

  sort?: (typeof GAME_SORT)[number]
}

export type Item = {
  /** 条目 ID */
  i: number

  /** 发行日期 */
  en: string

  /** 评分 */
  s?: number

  /** 排名 */
  r?: number

  /** 评分人数 */
  l: number

  /** 分类下标, 见 GAME_CATE_MAP */
  ta: number[]

  /** 标签下标数组 (见 ds.ts GAME_TAGS) */
  tg?: number[]

  /** 开发商下标, 见 GAME_DEV_MAP */
  d?: number[]

  /** 发行商下标, 见 GAME_PUB_MAP */
  p?: number[]

  /** 平台下标, 见 GAME_PLATFORM_MAP */
  pl: number[]

  /** 外网评分 */
  vs?: number

  /** 外网热度 */
  vc?: number

  /** 敏感标记 (1 = NSFW, 0/缺席 = 全年龄) */
  x?: number
}

/** @deprecated 原始压缩数据（unzip 专用） */
export type CompressedItem = {
  id?: number
  l?: number
  t?: string
  s?: string
  c?: string
  ta?: number[]
  lg?: number[]
  d?: number[]
  p?: number[]
  pl?: number[]
  en?: string
  cn?: string
  sc?: number
  r?: number
  o?: number
  v?: number
  vs?: number
  vc?: number
}

/** @deprecated 解压后的可读数据 */
export type GameUnzipItem = {
  id: number
  length: number
  title: string
  sub: string
  cover: string
  tag: string[]
  lang: string[]
  dev: string[]
  publish: string[]
  platform: string[]
  time: string
  timeCn: string
  score: number
  rank: number
  total: number
  vid: number
  vgScore: number
  vgCount: number
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
