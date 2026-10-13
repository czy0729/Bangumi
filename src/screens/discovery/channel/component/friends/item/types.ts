/*
 * @Author: czy0729
 * @Date: 2026-10-13 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-13 12:00:00
 *
 * 好友卡片类型
 */
import type { ChannelFriendsItem } from '@stores/discovery/types'

export type Props = {
  /** 条目数据 */
  item: ChannelFriendsItem

  /** 分组内索引 (决定左右间距) */
  index: number

  /** 懒渲染触发坐标 */
  y: number
}
