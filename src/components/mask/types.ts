/*
 * @Author: czy0729
 * @Date: 2025-02-02 21:54:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-02 21:58:47
 */
import type { Fn, WithViewStyles } from '@types'

export type MaskProps = WithViewStyles<{
  linear?: boolean
  onPress: Fn
}>
