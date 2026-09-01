/*
 * @Author: czy0729
 * @Date: 2022-12-03 10:16:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 22:43:46
 */
import type {
  CollectionStatus,
  CollectionStatusValue,
  SubjectId,
  SubjectTypeValue,
  WithNavigation
} from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  /** 页面 store */
  $: InstanceType<typeof Store>
}>

/** 置底数据 (current 为自增序号, 其余键为条目 ID 对应的置底序号) */
export type Bottom = {
  /** 当前自增序号 */
  current: number
} & Record<SubjectId, number>

export type CollectionPayload = {
  /** 收藏状态 */
  status?: CollectionStatus

  /** 评分 */
  rating?: number

  /** 标签 */
  tags?: string

  /** 简评 */
  comment?: string

  /** 是否私密 */
  privacy?: boolean
}

export type EpPayload = {
  /** 看到话数 */
  ep?: number
}

export type Item = {
  /** 收藏状态 */
  type: CollectionStatusValue | ''

  /** 评分 */
  rate: number | ''

  /** 看到话数 */
  ep_status: number | ''

  /** 看到卷数 */
  vol_status: number | ''

  /** 简评 */
  comment: string

  /** 标签 */
  tags: string[]

  /** 是否私密 */
  private: boolean

  /** 更新时间 */
  updated_at: string

  /** 条目信息 */
  subject: {
    /** 条目 ID */
    id: SubjectId

    /** 放送日期 */
    date: string

    /** 话数 */
    eps: number | ''

    /** 封面 */
    image: string

    /** 日文名 */
    jp: string

    /** 中文名 */
    cn: string

    /** 排名 */
    rank: number | ''

    /** 评分 */
    score: number | ''

    /** 条目类型 */
    type: SubjectTypeValue
  }
}
