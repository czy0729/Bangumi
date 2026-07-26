/*
 * @Author: czy0729
 * @Date: 2025-01-19 08:00:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 05:56:46
 */
import type { Fn, SubjectId, TextStyle, WithNavigation } from '@types'

export type Props = WithNavigation<{
  /** 文本样式 */
  style?: TextStyle

  /** 条目 ID */
  subjectId: SubjectId

  /** 要解析的文本内容 */
  text: string

  /** 点击回调 */
  onPress?: Fn
}>
