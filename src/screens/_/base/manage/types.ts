/*
 * @Author: czy0729
 * @Date: 2022-07-26 05:06:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-26 05:18:28
 */
import { Fn, SubjectTypeCn, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle

  /** 条目收藏状态 */
  collection: string

  /** 条目类型 (中文) */
  typeCn?: SubjectTypeCn

  /** 点击 */
  onPress: Fn
}
