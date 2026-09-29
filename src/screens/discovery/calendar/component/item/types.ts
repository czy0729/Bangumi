/*
 * @Author: czy0729
 * @Date: 2026-09-29 16:51:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-29 16:51:29
 *
 * 条目渲染的类型
 */
import type { Images, SubjectId } from '@types'
import type { SectionData } from '../../types'

export type Props = {
  /** 当前分区数据 */
  item: SectionData

  /** 当前分区 */
  section?: {
    /** 分区下标 */
    index: number
  }
}

/** 传给 ItemLine / ItemGrid 的条目视图模型 */
export type ItemView = {
  /** 条目 Id */
  subjectId: SubjectId

  /** 封面图组 */
  images: Images

  /** 显示名（译名优先） */
  name: string

  /** 原文名 */
  desc: string

  /** 排名 */
  rank: string | number

  /** 评分 */
  score: number

  /** 评分人数 */
  total: number

  /** 放送时间 */
  time: string

  /** 前一条目的放送时间 */
  prevTime: string

  /** 下标 */
  index: number
}
