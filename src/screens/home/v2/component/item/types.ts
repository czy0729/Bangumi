/*
 * @Author: czy0729
 * @Date: 2024-08-30 05:21:26
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-08-30 05:21:26
 */
import { Override, Subject, SubjectId } from '@types'
import { TabsLabel } from '../../types'

export type Props = {
  index: number
  subjectId: SubjectId
  subject: Override<
    Subject,
    {
      /** 收藏时间 (游戏才有) */
      time?: string
    }
  >
  title?: TabsLabel

  /** 看到多少集 */
  epStatus: string | number
}
