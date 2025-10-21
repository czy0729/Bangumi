/*
 * @Author: czy0729
 * @Date: 2025-10-20 15:50:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-20 17:28:24
 */
import type { ChannelFriendsItem } from '@stores/discovery/types'
import type { SubjectTypeCn } from '@types'

export type Props = {
  title: SubjectTypeCn
  avatar: string
  data: ChannelFriendsItem
}
