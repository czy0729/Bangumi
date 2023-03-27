/*
 * @Author: czy0729
 * @Date: 2022-07-26 05:06:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-28 06:27:20
 */
import { Fn, SubjectId, SubjectTypeCn, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle

  subjectId: SubjectId

  /** 条目收藏状态 */
  collection: string

  /** 条目类型 (中文) */
  typeCn?: SubjectTypeCn

  /** 点击 */
  onPress: Fn
}
