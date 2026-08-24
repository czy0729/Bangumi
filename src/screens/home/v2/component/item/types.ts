/*
 * @Author: czy0729
 * @Date: 2024-08-30 05:21:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:51:44
 */
import type { Override, Subject, SubjectId } from '@types'
import type { TabsLabel } from '../../types'

export type Props = {
  /** 列表索引 */
  index: number

  /** 条目 Id */
  subjectId: SubjectId

  /** 条目部分数据 */
  subject: Partial<
    Override<
      Subject,
      {
        /** 收藏时间 (游戏才有) */
        time?: string
      }
    >
  >

  /** 当前 Tab 标题 */
  title?: TabsLabel

  /** 看到多少集 */
  epStatus: string | number
}
