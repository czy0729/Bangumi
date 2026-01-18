/*
 * @Author: czy0729
 * @Date: 2024-09-28 21:16:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-18 16:41:11
 */
import type { Fn, WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  icon?: 'wordcloud' | 'bilibili' | 'dou'
  onPress: Fn
}>
