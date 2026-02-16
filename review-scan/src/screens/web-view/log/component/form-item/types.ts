/*
 * @Author: czy0729
 * @Date: 2025-03-16 06:39:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-16 06:39:30
 */
import { ViewStyle } from '@types'
import { STATE } from '../../store/ds'

export type Props = {
  style?: ViewStyle
  name: keyof typeof STATE
}
