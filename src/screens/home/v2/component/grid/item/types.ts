/*
 * @Author: czy0729
 * @Date: 2022-07-17 03:51:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-08 00:22:25
 */
import type { Override, Subject, SubjectId } from '@types'

export type Props = {
  subject?: Partial<
    Override<
      Subject,
      {
        time?: string
      }
    >
  >
  subjectId?: SubjectId
  epStatus?: string | number
}
