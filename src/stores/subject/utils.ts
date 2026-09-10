/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:26:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-20 01:46:28
 */
import { HOST } from '@constants'

import type { ResponseV0Episodes } from '@types'
import type { SubjectSnapshot } from './types'

/** 条目信息桶容量上限 (每桶): 内含 eps / staff / crt / collection 等大数组 */
export const SUBJECT_BUCKET_LIMIT = 30

/** 条目 HTML 桶容量上限 (每桶): 单条体量最大 (整套 HTML 解析结果) */
export const SUBJECT_FORM_HTML_BUCKET_LIMIT = 20

/** 条目 new api 桶容量上限 (每桶): 单条最轻, 但被列表高频读取, 上界放宽避免频繁重取 */
export const SUBJECT_V2_BUCKET_LIMIT = 300

/** 条目吐槽箱桶容量上限 (每桶): 内含留言列表 */
export const SUBJECT_COMMENTS_BUCKET_LIMIT = 20

/** 条目云缓存容量上限: 单条体量大 (整个条目数据), 淘汰后走 v2 / HTML 重新组装 */
export const SUBJECT_FROM_OSS_LIMIT = 30

/** 章节信息 (集数大于 1000 的条目) 容量上限: 内含 eps 列表 */
export const EP_V2_LIMIT = 20

/** 条目 VIB 数据容量上限: 单条最轻, 但被条目页高频读取, 上界放宽避免频繁重取 */
export const VIB_LIMIT = 100

/** 条目分数容量上限: 单条最轻, 但被列表高频读取, 上界放宽避免频繁重取 */
export const RANK_LIMIT = 300

/**
 * 组装条目快照
 *
 * @param air_date 放送日期
 * @param common 封面地址
 * @param name 原名
 * @param name_cn 中文名
 * @param score 评分
 * @param total 评分人数
 * @param rank 排名
 */
export function getSubjectSnapshot(
  air_date: string = '',
  common: string = '',
  name: string = '',
  name_cn: string = '',
  score: number | string = 0,
  total: number | string = 0,
  rank: number | '' = ''
): SubjectSnapshot {
  return {
    air_date,
    images: {
      common
    },
    name,
    name_cn,
    rating: {
      score: Number(score) || 0,
      total: Number(total) || 0
    },
    rank,
    _loaded: 1
  }
}

/** v0 章节数据元素 */
type V0EpisodeItem = ResponseV0Episodes['data'][number]

export function mapV0Episodes(data: ResponseV0Episodes['data'] = []) {
  return data.map((item: V0EpisodeItem) => {
    const name = String(item.name ?? '')
    const name_cn = String(item.name_cn ?? '')

    return {
      airdate: String(item.airdate ?? ''),
      comment: Number(item.comment) || 0,
      desc: '',
      duration: String(item.duration ?? ''),
      id: Number(item.id) || 0,
      name,
      name_cn,
      sort: Number(item.sort) || 0,
      status: (name || name_cn ? 'Air' : 'NA') as 'Air' | 'NA',
      type: Number(item.type) || 0,
      url: `${HOST}/ep/${item.id}` as const
    }
  })
}
