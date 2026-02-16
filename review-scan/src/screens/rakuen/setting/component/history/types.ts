/*
 * @Author: czy0729
 * @Date: 2024-12-25 15:23:39
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-12-25 15:23:39
 */
import { BlockedUsersItem } from '@stores/rakuen/types'
import { Fn, Navigation, ViewStyle } from '@types'

export type Props = {
  navigation?: Navigation
  style?: ViewStyle
  data: string[] | BlockedUsersItem[]
  showAvatar?: boolean
  onNavigate?: Fn
  onDelete?: Fn
}
