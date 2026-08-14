/*
 * @Author: czy0729
 * @Date: 2022-11-07 04:24:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-14 21:06:03
 */
import type { PropsWithChildren } from 'react'
import type { ReactNode, WithViewStyles } from '@types'
import type { TextType } from '../text/types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 是否显示弹窗 */
    visible: boolean

    /** 键盘聚焦时是否整体上移避让输入法 */
    focus?: boolean

    /** 弹窗标题 */
    title?: string

    /** 标题栏右侧自定义内容 */
    right?: ReactNode

    /** 文字颜色主题 */
    type?: TextType

    /** [网页] 打开时是否播放渐入渐出动画 */
    animated?: boolean

    /** 点击遮罩层是否关闭弹窗 */
    maskClosable?: boolean

    /** 请求关闭弹窗的回调 */
    onClose: () => void
  }>
>
