/*
 * @Author: czy0729
 * @Date: 2026-07-24 18:11:51
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-24 18:11:51
 */
import type { WithFilterProps } from '../../../../types'

export type Props = WithFilterProps<{
  label: string
  value: string
  show: boolean
  onPress: (value: string) => void
}>
