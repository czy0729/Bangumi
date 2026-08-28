/*
 * @Author: czy0729
 * @Date: 2026-07-24 18:11:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 01:44:30
 */
import type { WithFilterProps } from '../../../../types'

export type Props<T = string> = WithFilterProps<{
  label: string
  value: T
  show: boolean

  /** 点击切换 */
  onPress: (value: T) => void
}>
