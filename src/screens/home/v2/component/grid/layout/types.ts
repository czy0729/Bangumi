/*
 * @Author: czy0729
 * @Date: 2025-10-08 00:30:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 04:10:49
 */
import type { Subject, SubjectId } from '@types'
import type { Props as GridProps } from '../types'

export type Props = Pick<GridProps, 'title'>

/** 当前选中项（列表收藏项 / 格子布局临时条目共有的形状） */
export type FindItem = {
  /** 条目 Id */
  subject_id: SubjectId

  /** 条目部分数据 (time 为游戏临时条目专有) */
  subject?: Partial<Subject> & {
    /** 收藏时间 */
    time?: string
  }

  /** 已看集数 */
  ep_status: string | number
}
