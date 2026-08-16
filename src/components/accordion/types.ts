/*
 * @Author: czy0729
 * @Date: 2022-06-25 16:11:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 10:00:00
 */
import type { PropsWithChildren } from 'react'
import type { WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 是否展开, 默认 false */
    expand: boolean

    /** 收起后是否销毁, 默认 true */
    lazy?: boolean

    /** 动画结束回调 */
    onAnimationEnd?: () => void
  }>
>

/** useAccordionAnimation 选项 */
export type AccordionAnimationOptions = Pick<Props, 'expand' | 'lazy' | 'onAnimationEnd'> & {
  /** 底部安全区, 收起时额外下移距离 */
  bottom: number
}
