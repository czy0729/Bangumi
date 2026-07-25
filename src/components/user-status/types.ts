/*
 * @Author: czy0729
 * @Date: 2022-10-19 14:19:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-19 14:20:58
 */
import type { PropsWithChildren } from 'react'
import type { UserId, WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 用户最后在线的时间戳（秒），优先使用此值 */
    last?: number

    /** 用户 ID，用于从 store 获取在线状态 */
    userId?: UserId

    /** 是否使用迷你模式显示状态指示器 */
    mini?: boolean
  }>
>
