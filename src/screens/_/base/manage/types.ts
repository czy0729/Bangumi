/*
 * @Author: czy0729
 * @Date: 2022-07-26 05:06:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-11 03:26:03
 */
import { Fn, SubjectId, SubjectTypeCn, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle

  subjectId?: SubjectId

  /** 条目收藏状态 */
  collection: string

  /** 条目类型 (中文) */
  typeCn?: SubjectTypeCn

  /** 水平布局 */
  horizontal?: boolean

  /** [网页] 是否使用跳转到 bgm.tv 代替收藏管理按钮 */
  showRedirect?: boolean

  /** 点击 */
  onPress: Fn
}
