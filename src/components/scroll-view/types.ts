/*
 * @Author: czy0729
 * @Date: 2022-08-12 10:52:01
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-12 10:52:01
 */
import { ScrollViewProps } from 'react-native'
import { Expand, Fn, ReactNode } from '@types'

export type Props = Expand<
  ScrollViewProps & {
    /** 是否启用点击顶部滚动到顶（安卓 only） */
    scrollToTop?: boolean

    /** 连接 ref.scrollTo */
    connectRef?: (scrollTo: Fn) => any

    children?: ReactNode
  }
>
