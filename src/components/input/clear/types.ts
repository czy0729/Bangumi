/*
 * @Author: czy0729
 * @Date: 2026-07-28 10:24:12
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-07-28 10:24:12
 */
import type { Props as InputProps } from '../types'

export type Props = Pick<InputProps, 'colorClear'> & {
  onPress: () => void
}
