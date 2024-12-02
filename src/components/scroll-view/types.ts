/*
 * @Author: czy0729
 * @Date: 2022-08-12 10:52:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-24 10:39:02
 */
import { ScrollView, ScrollViewProps } from 'react-native'
import { Expand, ReactNode } from '@types'

export type ScrollTo = (params: { x?: number; y?: number; animated?: boolean }) => void

export type Props = Expand<
  ScrollViewProps & {
    /** 是否启用点击顶部滚动到顶（安卓 only） */
    scrollToTop?: boolean

    animated?: boolean

    /** 连接 ref.scrollTo */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    forwardRef?: (scrollTo: ScrollTo, scrollViewRef?: ScrollView) => any

    /** @deprecated 连接 ref.scrollTo */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    connectRef?: (scrollTo: ScrollTo, scrollViewRef?: ScrollView) => any

    children?: ReactNode
  }
>
