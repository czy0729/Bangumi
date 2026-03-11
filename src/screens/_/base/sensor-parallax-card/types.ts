/*
 * @Author: czy0729
 * @Date: 2026-03-10 22:21:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-10 22:23:55
 */
import type { WithViewStyles } from '@types'
import type { PropsWithChildren } from 'react'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 重力敏感度 (影响偏移像素大小) */
    sensitivity?: number

    /** 是否响应 */
    enabled?: boolean

    /** 是否反转动画 */
    reverse?: boolean

    /** 是否产生旋转动画 */
    enableRotate?: boolean
  }>
>
