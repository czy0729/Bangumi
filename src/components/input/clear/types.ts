/*
 * @Author: czy0729
 * @Date: 2026-07-28 10:24:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 15:00:00
 */
import type { Props as InputProps } from '../types'

export type Props = Pick<InputProps, 'colorClear'> & {
  /** 多行输入框, 图标对齐首行 */
  multiline?: boolean

  onPress: () => void
}
