/*
 * @Author: czy0729
 * @Date: 2024-12-25 15:23:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-28 00:28:08
 */
import type { BlockedUsersItem } from '@stores/rakuen/types'
import type { Fn, UserId, WithNavigation, WithViewStyles } from '@types'

export type Props = WithNavigation<
  WithViewStyles<{
    data: string[] | BlockedUsersItem[]
    showAvatar?: boolean

    /** 点击记录时的导航回调 (当前仅跳转用户空间) */
    onNavigate?: (path: 'Zone', params: { userId: UserId }) => void

    /** @todo 旧代码: 使用方 item 形态不一 (string / BlockedUsersItem), 待收口 */
    onDelete?: Fn
  }>
>
