/*
 * @Author: czy0729
 * @Date: 2024-12-25 15:23:39
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-12-25 15:23:39
 */
import type { BlockedUsersItem } from '@stores/rakuen/types'
import type { Fn, WithNavigation, WithViewStyles } from '@types'

export type Props = WithNavigation<
  WithViewStyles<{
    data: string[] | BlockedUsersItem[]
    showAvatar?: boolean
    onNavigate?: Fn
    onDelete?: Fn
  }>
>
