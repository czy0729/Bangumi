/*
 * @Author: czy0729
 * @Date: 2022-11-07 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-14 15:51:12
 */
import type { PropsWithChildren } from 'react'
import type { WithViewStyles } from '@types'
import type { TextType } from '../text/types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 是否显示 */
    visible: boolean

    /** 是否键盘聚焦中，若为真会往上移动一段距离 */
    focus?: boolean

    /** 标题 */
    title?: string

    /** 文字颜色 */
    type?: TextType

    /** [网页] 是否显示渐出动画 */
    animated?: boolean

    /** 是否允许点击遮罩关闭 */
    maskClosable?: boolean

    /** 关闭回调 */
    onClose: () => void
  }>
>
