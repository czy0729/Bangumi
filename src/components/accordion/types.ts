/*
 * @Author: czy0729
 * @Date: 2022-06-25 16:11:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 23:48:24
 */
import type { PropsWithChildren } from 'react'
import type { WithViewStyles } from '@types'

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 是否展开, 默认 false */
    expand: boolean

    /** 收起后是否销毁, 默认 true */
    lazy?: boolean
  }>
>
