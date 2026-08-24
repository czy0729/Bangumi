/*
 * @Author: czy0729
 * @Date: 2022-07-17 03:51:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 00:22:25
 */
import type { Override, Subject, SubjectId } from '@types'

export type Props = {
  /** 条目部分数据 */
  subject?: Partial<
    Override<
      Subject,
      {
        /** 收藏时间 (游戏才有) */
        time?: string
      }
    >
  >

  /** 条目 Id */
  subjectId?: SubjectId

  /** 已看集数 */
  epStatus?: string | number
}
