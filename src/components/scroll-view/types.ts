/*
 * @Author: czy0729
 * @Date: 2022-08-12 10:52:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 20:41:31
 */
import { ScrollViewProps } from 'react-native'
import { Expand, Fn, ReactNode } from '@types'

export type Props = Expand<
  ScrollViewProps & {
    /** 是否启用点击顶部滚动到顶（安卓 only） */
    scrollToTop?: boolean

    animated?: boolean

    /** 连接 ref.scrollTo */
    forwardRef?: (scrollTo: Fn) => any

    /** @deprecated 连接 ref.scrollTo */
    connectRef?: (scrollTo: Fn) => any

    children?: ReactNode
  }
>
