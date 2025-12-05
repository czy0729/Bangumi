/*
 * @Author: czy0729
 * @Date: 2025-05-03 19:08:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-04 18:19:28
 */
import { PickItem } from '../types'

export type Props = {
  type: string
  src?: string
  id: number
  level?: number
  rank?: number
  name: string
  extra?: string
  assets?: number
  sacrifices?: number
  refine?: number
  disabled?: boolean
  item: PickItem
  onPress: (item: PickItem) => void
}
