/*
 * @Author: czy0729
 * @Date: 2026-10-05 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-05 00:00:00
 */
import type { Loaded } from '@types'
import type { ALBUM_SORT } from './ds'

/** 查询指纹, 由筛选条件序列化得到 */
export type Finger = string

export type Query = {
  tag?: string

  /** 出版社 (ALBUM_PUBLISHERS 项, 空串表示未筛选) */
  publisher?: string

  /** 作者 (ALBUM_AUTHORS 项, 空串表示未筛选) */
  author?: string

  /** 类型 (ALBUM_CATES 项, 空串表示未筛选) */
  cate?: string

  /** 发售年份 (d 前缀, 空串表示未筛选) */
  year?: string | number

  /** 分级 ('限制' = NSFW, '未知' = 全年龄, 空串表示未筛选) */
  x?: string

  sort?: (typeof ALBUM_SORT)[number]
}

export type Item = {
  /** 条目 ID */
  i: number

  /** 发售日期 */
  d?: string

  /** 评分 */
  s?: number

  /** 排名 */
  r?: number

  /** 评分人数 */
  l?: number

  /** 标签下标数组 (见 ds.ts ALBUM_TAGS) */
  t?: number[]

  /** 敏感标记 (1 = NSFW, 0/缺席 = 全年龄) */
  x?: number

  /** 出版社下标数组 (见 ds.ts ALBUM_PUBLISHERS) */
  p?: number[]

  /** 作者下标数组 (见 ds.ts ALBUM_AUTHORS) */
  a?: number[]

  /** 类型下标 (见 ds.ts ALBUM_CATES; 1-based, 0/缺席 = 无) */
  c?: number
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
