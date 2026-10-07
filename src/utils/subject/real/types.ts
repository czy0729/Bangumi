/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-03 00:00:00
 */
import type { Loaded } from '@types'
import type { REAL_NSFW, REAL_SORT } from './ds'

/** 查询指纹, 由筛选条件序列化得到 */
export type Finger = string

export type Query = {
  tag?: string
  region?: string
  form?: string
  year?: string | number

  /** 分级 ('限制' = NSFW, '未知' = 全年龄, 空串表示未筛选) */
  x?: '' | (typeof REAL_NSFW)[number]

  sort?: (typeof REAL_SORT)[number]
}

export type Item = {
  /** 条目 ID */
  i: number

  /** 发行/首播日期 */
  d?: string

  /** 评分 */
  s?: number

  /** 排名 */
  r?: number

  /** 评分人数 */
  l?: number

  /** 标签下标数组 (见 ds.ts REAL_TAGS) */
  t?: number[]

  /** 地区 (REAL_REGION 下标 + 1, 缺席 = 其他) */
  g?: number

  /** 形式 (REAL_FORM 下标 + 1, 缺席 = 其他) */
  f?: number

  /** 敏感标记 (1 = NSFW, 0/缺席 = 全年龄) */
  x?: number
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
