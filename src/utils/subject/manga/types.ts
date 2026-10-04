/*
 * @Author: czy0729
 * @Date: 2026-10-04 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 00:00:00
 */
import type { Loaded } from '@types'
import type { MANGA_SORT } from './ds'

/** 查询指纹, 由筛选条件序列化得到 */
export type Finger = string

export type Query = {
  tag?: string

  /** 出版社 (MANGA_PUBLISHERS 项, 空串表示未筛选) */
  publisher?: string

  /** 卷数档位 (MANGA_VOL 项, 空串表示未筛选) */
  vol?: string

  /** 话数档位 (MANGA_CH 项, 空串表示未筛选) */
  ch?: string

  /** 开始年份 (st || d 前缀, 空串表示未筛选) */
  start?: string | number

  /** 更新年份 (ud || d 前缀, 空串表示未筛选) */
  update?: string | number

  /** 结束年份 (ed 前缀, 空串表示未筛选) */
  end?: string | number

  /** 分级 ('限制' = NSFW, '未知' = 全年龄, 空串表示未筛选) */
  x?: string

  sort?: (typeof MANGA_SORT)[number]
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

  /** 标签下标数组 (见 ds.ts MANGA_TAGS) */
  t?: number[]

  /** 开始日期 (系列内最早单卷发售日, 缺席 = 同 d) */
  st?: string

  /** 更新日期 (系列内最晚单卷发售日, 缺席 = 同 d) */
  ud?: string

  /** 结束日期 (infobox 结束 / 连载结束) */
  ed?: string

  /** 卷数 (infobox 册数, 关系聚合单行本数回落) */
  v?: number

  /** 话数 */
  c?: number

  /** 出版社下标数组 (见 ds.ts MANGA_PUBLISHERS) */
  p?: number[]

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
