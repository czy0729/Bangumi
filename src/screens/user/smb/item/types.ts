/*
 * @Author: czy0729
 * @Date: 2023-11-17 10:08:38
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-11-17 10:08:38
 */
import { Override, SubjectId } from '@types'
import { SMBListItem } from '../types'

export type Props = Override<
  SMBListItem,
  {
    subjectId: SubjectId
  }
>
