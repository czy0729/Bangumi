/*
 * @Author: czy0729
 * @Date: 2022-09-14 15:04:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:56:41
 */
import type { Loaded } from '@types'
import type { ANIME_AREA, ANIME_BEGIN, ANIME_OFFICIAL, ANIME_STATUS, ANIME_TYPE } from './ds'

/** 查询指纹, 由筛选条件序列化得到 */
export type Finger = string

export type Query = {
  area?: (typeof ANIME_AREA)[number]
  type?: (typeof ANIME_TYPE)[number]
  year?: string | number
  begin?: (typeof ANIME_BEGIN)[number]
  status?: (typeof ANIME_STATUS)[number]
  tags?: string[]
  official?: (typeof ANIME_OFFICIAL)[number]
  sort?: string
}

export type Item = {
  /** 条目 ID */
  i: number

  /** 评分 */
  s?: number

  /** 排名 */
  r?: number

  /** 评分人数 */
  l?: number

  /** 类型, 缺席视为 TV */
  ty?: string

  /** 标签下标, 见 ANIME_TAGS_MAP */
  t?: number[]

  /** 放送日期 */
  b?: string

  /** 地区, 缺席视为 jp */
  ar?: 'jp' | 'cn'

  /** 放送状态: 1 = 连载, 2 = 未播放, 缺席视为完结 */
  st?: number

  /** 制作公司下标, 见 ANIME_OFFICIAL_MAP */
  o: number[]
}

export type UnzipItem = {
  id: number
  ageId: number
  type: string
  area: 'jp' | 'cn'
  status: number | string
  official: string
  tags: string
  ep: string
  cn: string
  jp: string
  image: string
  begin: string
  score: number
  rank: number
  total: number
}

/** @deprecated 原始压缩数据（unzip 专用） */
export type CompressedItem = {
  id?: number
  a?: number
  ty?: string
  ar?: 'jp' | 'cn'
  st?: number
  o?: number[]
  t?: number[]
  e?: string
  c?: string
  j?: string
  i?: string
  b?: string
  s?: number
  r?: number
  l?: number
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
