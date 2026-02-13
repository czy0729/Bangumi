/*
 * @Author: czy0729
 * @Date: 2022-08-31 19:54:13
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-31 19:54:13
 */
import type { WithViewStyles } from '@types'

export type Props = WithViewStyles<{
  topSpacing?: number
  animate?: boolean
  onToggle?: (toggle?: boolean, keyboardSpace?: number) => any
}>
