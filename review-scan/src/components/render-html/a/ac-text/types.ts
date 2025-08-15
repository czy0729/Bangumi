/*
 * @Author: czy0729
 * @Date: 2025-01-19 08:00:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-19 08:01:01
 */
import { Fn, Navigation, SubjectId, TextStyle } from '@types'

export type Props = {
  navigation?: Navigation
  style?: TextStyle
  subjectId: SubjectId
  text: string
  onPress?: Fn
}
