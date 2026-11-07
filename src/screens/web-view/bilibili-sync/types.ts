/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:49:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 03:00:00
 *
 * 页面数据结构
 */
import type { SubjectId, WithNavigation } from '@types'
import type Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type BilibiliItem = {
  /** 21226899 */
  id: number

  /** "鬼灭之刃 柱训练篇" */
  title: string

  /** "https://i0.hdslb.com/bfs/bangumi/image/07a4ec8e2a95558a99859e1e374fe4b634e47aaf.png" */
  cover: string

  /** 2 */
  status: number

  /** 条目 ID, 需要经过 bangumi-data 中查找过才存在 */
  subjectId?: SubjectId

  /** "看到第1话 0:01" */
  progress: string

  /** 8 */
  total: number
}

export type Reviews = Record<
  SubjectId,
  {
    /** 评价内容 */
    content?: string

    /** 评分 */
    score?: number
  }
>

/** bangumi 收藏信息 (用于对照) */
export type CollectionInfo = {
  /** 收藏状态 */
  status?: string

  /** 看到第几话 */
  ep_status?: string | number

  /** 是否私密 */
  private?: boolean

  /** 评分 */
  rating?: string | number

  /** 评价 */
  comment?: string

  /** 加载时间 */
  loaded?: number
}

/** 收藏接口返回 */
export type CollectionResponse = {
  /** 收藏状态 */
  status?: {
    /** 状态值 */
    type?: string
  }

  /** 看到第几话 */
  ep_status?: string | number

  /** 是否私密 */
  private?: boolean

  /** 评分 */
  rating?: string | number

  /** 评价 */
  comment?: string
}
