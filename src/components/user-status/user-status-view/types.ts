/*
 * @Author: czy0729
 * @Date: 2026-08-10 11:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-10 11:00:00
 */
import type { PropsWithChildren } from 'react'
import type { WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 用户最后在线的时间戳（秒） */
    lastTS: number

    /** 是否使用迷你模式显示状态指示器 */
    mini?: boolean
  }>
>
