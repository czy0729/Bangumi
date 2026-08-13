/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-12 10:00:00
 */
import type { Dispatch, PropsWithChildren, ReactNode, SetStateAction } from 'react'
import type { NativeScrollEvent, NativeSyntheticEvent, ViewStyle } from 'react-native'
import type { PaginationProps } from './pagination/types'
import type { WithViewStyles } from '@types'

/** 轮播分页指示器样式集合 */
export type CarouselStyle = {
  /** 分页容器 */
  pagination: ViewStyle

  /** 横向分页定位 */
  paginationX: ViewStyle

  /** 纵向分页定位 */
  paginationY: ViewStyle

  /** 圆点基础样式 */
  pointStyle: ViewStyle

  /** 激活圆点样式 */
  pointActiveStyle: ViewStyle

  /** 圆点间距 */
  spaceStyle: ViewStyle
}

/** 滚动结束事件: 原生 ScrollView 或 android 自动播放模拟 (带 position) */
export type CarouselEvent = NativeSyntheticEvent<NativeScrollEvent> & {
  nativeEvent: NativeScrollEvent & { position?: number }
}

export type Props = PropsWithChildren<
  WithViewStyles<{
    /** 分页样式局部覆盖 (ant 风格的 Partial<CarouselStyle>) */
    styles?: Partial<CarouselStyle>

    /** 初始页, 默认 0 */
    selectedIndex?: number

    /** 是否纵向, 默认 false */
    vertical?: boolean

    /** 自动播放, 仅当 children 为数组时生效, 默认 false */
    autoplay?: boolean

    /** 自动播放间隔 (ms), 默认 3000 */
    autoplayInterval?: number

    /** 边缘回弹, 默认 true */
    bounces?: boolean

    /** 激活圆点样式覆盖 */
    dotActiveStyle?: ViewStyle

    /** 未激活圆点样式覆盖 */
    dotStyle?: ViewStyle

    /** 是否显示分页指示, 默认 true */
    dots?: boolean

    /** 是否无限循环, 默认 false */
    infinite?: boolean

    /** 自定义分页渲染 */
    pagination?: (props: PaginationProps) => ReactNode

    /** 开始拖动回调 */
    onScrollBeginDrag?: (e: CarouselEvent) => void

    /** 惯性滚动结束回调 */
    onMomentumScrollEnd?: (e: CarouselEvent) => void

    /** 切页完成后回调 */
    afterChange?: (index: number) => void
  }>
>

/** useCarousel 选项: 组件 Props 子集 + 内部状态 (count/size/onSizeChange) */
export type UseCarouselOptions = Pick<
  Props,
  | 'afterChange'
  | 'autoplay'
  | 'autoplayInterval'
  | 'children'
  | 'infinite'
  | 'onMomentumScrollEnd'
  | 'onScrollBeginDrag'
  | 'selectedIndex'
  | 'vertical'
> & {
  /** 子元素个数 */
  count: number

  /** 容器尺寸 */
  size: { width: number; height: number }

  /** 容器尺寸变化回调 */
  onSizeChange?: Dispatch<SetStateAction<{ width: number; height: number }>>
}
