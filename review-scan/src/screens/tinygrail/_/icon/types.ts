/*
 * @Author: czy0729
 * @Date: 2024-12-27 06:33:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-27 07:38:12
 */
import { EventType, Id, MonoId, ViewStyle } from '@types'

export type Props = {
  style?: ViewStyle
  id?: MonoId
  monoId: Id
  name: string
  icon: string
  size?: number
  radius?: number
  event?: EventType
}
