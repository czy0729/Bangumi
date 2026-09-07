/*
 * @Author: czy0729
 * @Date: 2023-04-16 13:26:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-20 01:46:28
 */
import { HOST } from '@constants'

import type { ResponseV0Episodes } from '@types'
import type { SubjectSnapshot } from './types'

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
