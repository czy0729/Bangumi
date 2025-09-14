/*
 * @Author: czy0729
 * @Date: 2024-11-14 20:14:49
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-11-14 20:14:49
 */
import { SubjectId, SubjectTypeCn } from '@types'
import { TabsLabel } from '../../../types'

export type Props = {
  subjectId: SubjectId
  typeCn: SubjectTypeCn
  title: TabsLabel
  name: string
  name_cn: string
  doing: number
}
