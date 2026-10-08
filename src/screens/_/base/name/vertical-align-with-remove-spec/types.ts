/*
 * @Author: czy0729
 * @Date: 2026-10-08 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-08 01:40:00
 */
import type { TextProps } from '@components'
import type { Override, ReactNode, UserId } from '@types'

export type Props = Override<
  TextProps,
  {
    /** 名字文本 */
    text: string

    /** 用户 ID */
    userId?: UserId

    /** 是否显示好友 label */
    showFriend?: boolean

    /** 用户备注, 存在时高亮显示 */
    userRemark?: string

    /** 右侧额外 */
    right?: ReactNode
  }
>
