/*
 * @Author: czy0729
 * @Date: 2024-12-25 15:23:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 20:57:58
 */
import type { BlockedUsersItem } from '@stores/rakuen/types'
import type { UserId, WithViewStyles } from '@types'

/** 屏蔽列表项 */
export type HistoryItem = string | BlockedUsersItem

export type Props<T extends HistoryItem = HistoryItem> = WithViewStyles<{
  /** 屏蔽记录列表 */
  data: T[]

  /** 是否显示用户头像（仅绝交用户有头像） */
  showAvatar?: boolean

  /** 点击记录时的导航回调 (当前仅跳转用户空间) */
  onNavigate?: (path: 'Zone', params: { userId: UserId }) => void

  /** 删除记录回调，item 类型与 data 数组元素类型一致 */
  onDelete?: (item: T) => void
}>
