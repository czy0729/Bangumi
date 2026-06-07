/*
 * @Author: czy0729
 * @Date: 2022-08-12 10:52:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 20:08:01
 */
import type { ScrollView, ScrollViewProps } from 'react-native'
import type { Expand } from '@types'

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

    /** 是否显示左右溢出遮罩（仅水平模式有效） */
    showMask?: boolean

    /** 左右溢出遮罩宽度 */
    maskWidth?: number
  }
>
