/*
 * @Author: czy0729
 * @Date: 2022-07-01 18:53:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 */
import type { Id, ListEmpty, SubjectType } from '@types'

export type SearchItem = {
  /** 条目 ID（href） */
  id: Id

  /** 封面图地址 */
  cover: string

  /** 原名 */
  name: string

  /** 中文名 */
  nameCn: string

  /** 简介 */
  tip: string

  /** 评分 */
  score: string

  /** 评分人数 */
  total: string

  /** 排名 */
  rank: string

  /** 条目类型，人物搜索为空 */
  type: SubjectType | ''

  /** 是否已收藏 */
  collected: boolean

  /** 人物搜索为讨论楼层数，条目搜索为空 */
  comments: string
}

/** 搜索 */
export type Search = ListEmpty<SearchItem>

/** 帖子搜索项 */
export type RakuenSearchItem = {
  id: number
  title: string
  message: string
  userName: string
  time: string
  group: string

  /** 回复数 */
  replies?: number
}

/** 帖子搜索结果 */
export type RakuenSearch = ListEmpty<RakuenSearchItem>
