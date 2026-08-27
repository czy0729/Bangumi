/*
 * @Author: czy0729
 * @Date: 2022-08-12 10:52:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-27 20:39:52
 */
import type {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewProps
} from 'react-native'
import type { Expand, ViewStyle } from '@types'

/** 滚动到指定坐标 */
export type ScrollTo = (params: { x?: number; y?: number; animated?: boolean }) => void

/** 遮罩渐变色 [左, 中, 右] */
export type MaskColors = readonly [string, string, string]

/** 通用 ScrollView 组件 Props */
export type Props = Expand<
  ScrollViewProps & {
    /** 是否启用点击顶部滚动到顶（安卓 only） */
    scrollToTop?: boolean

    /** 是否启用动画滚动组件 */
    animated?: boolean

    /** 连接 ref.scrollTo */
    forwardRef?: (scrollTo: ScrollTo, scrollViewRef?: ScrollView) => void

    /** @deprecated 连接 ref.scrollTo */
    connectRef?: (scrollTo: ScrollTo, scrollViewRef?: ScrollView) => void

    /** 是否显示左右溢出遮罩（仅水平模式有效） */
    showMask?: boolean

    /** 左右溢出遮罩宽度 */
    maskWidth?: number

    /** 遮罩渐变色, 默认读主题色 */
    maskColors?: MaskColors

    /** 左侧遮罩附加样式 (与内部 opacity 滚动动画合并, 动画始终生效) */
    leftMaskStyle?: ViewStyle

    /** 右侧遮罩附加样式 */
    rightMaskStyle?: ViewStyle
  }
>

/** ScrollView 原生滚动事件 */
export type ScrollEvent = NativeSyntheticEvent<NativeScrollEvent>

/** 全局滚动锁状态机参数 */
export type ScrollLockOptions = {
  /** 滚动回调 */
  onScroll?: (e: ScrollEvent) => void

  /** 开始拖动回调 */
  onScrollBeginDrag?: (e: ScrollEvent) => void

  /** 结束拖动回调 */
  onScrollEndDrag?: (e: ScrollEvent) => void

  /** 惯性滚动结束回调 */
  onMomentumScrollEnd?: (e: ScrollEvent) => void
}

/** 水平渐隐遮罩参数 */
export type UseHorizontalMaskOptions = Pick<
  Props,
  'horizontal' | 'showMask' | 'maskColors' | 'onContentSizeChange'
>

/** ScrollView ref 回调参数 */
export type UseScrollViewRefOptions = Pick<Props, 'scrollToTop' | 'forwardRef' | 'connectRef'>
