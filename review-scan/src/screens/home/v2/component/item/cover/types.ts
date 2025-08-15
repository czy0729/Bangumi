/*
 * @Author: czy0729
 * @Date: 2024-05-15 10:01:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-15 10:01:25
 */
import { SubjectId, SubjectTypeCn } from '@types'

export type Props = {
  index: number
  subjectId: SubjectId
  typeCn: SubjectTypeCn
  name: string
  name_cn: string
  image: string
}
