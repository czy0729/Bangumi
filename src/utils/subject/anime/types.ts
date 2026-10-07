/*
 * @Author: czy0729
 * @Date: 2022-09-14 15:04:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:56:41
 */
import type { Loaded } from '@types'
import type { ANIME_AREA, ANIME_BEGIN, ANIME_EP, ANIME_NSFW, ANIME_OFFICIAL, ANIME_STATUS } from './ds'

/** 查询指纹, 由筛选条件序列化得到 */
export type Finger = string

export type Query = {
  area?: (typeof ANIME_AREA)[number]
  /** 类型 (meta_tags, 多选) */
  meta?: string[]
  year?: string | number
  begin?: (typeof ANIME_BEGIN)[number]
  status?: (typeof ANIME_STATUS)[number]
  /** 集数 (infobox 话数, 空串表示未筛选) */
  ep?: (typeof ANIME_EP)[number]
  tags?: string[]
  official?: (typeof ANIME_OFFICIAL)[number]
  /** 分级 ('限制' = NSFW, '未知' = 全年龄, 空串表示未筛选) */
  x?: (typeof ANIME_NSFW)[number]
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

  /** 地区, 'cn' 中国 / 'ot' 欧美, 缺席视为日本 */
  ar?: 'jp' | 'cn' | 'ot'

  /** 放送状态: 1 = 连载, 2 = 未播放, 缺席视为完结 */
  st?: number

  /** 制作公司下标, 见 ANIME_OFFICIAL_MAP */
  o: number[]

  /** 话数 (infobox 话数) */
  e?: number

  /** 敏感标记 (1 = NSFW, 0/缺席 = 全年龄) */
  x?: number

  /** 类型 meta_tags 下标, 见 ANIME_META_MAP */
  mt?: number[]
}

export type UnzipItem = {
  id: number
  ageId: number
  type: string
  area: 'jp' | 'cn' | 'ot'
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
  ar?: 'jp' | 'cn' | 'ot'
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
