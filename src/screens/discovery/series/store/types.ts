/*
 * @Author: czy0729
 * @Date: 2026-10-16 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-16 00:00:00
 *
 * store 内部类型: 接口响应与通用能力参数
 */
import type { SubjectId } from '@types'
import type { RELATIONS } from '../ds'

/** v0 收藏条目 */
export type CollectionRaw = {
  subject_id: SubjectId
  type: number
  ep_status: number
  updated_at: string
}

/** v0 条目信息 */
export type SubjectRaw = {
  id: SubjectId
  name_cn?: string
  name?: string
  images?: {
    common?: string
  }
  date?: string
  eps?: number
  total_episodes?: number
  platform?: string
  rating?: {
    rank?: number
    score?: number
    total?: number
  }
}

/** v0 关联条目 */
export type RelationRaw = {
  id: SubjectId
  type: number
  relation: (typeof RELATIONS)[number]
}

/** 请求进度 */
export type Progress = {
  message: string
  total: number
}
