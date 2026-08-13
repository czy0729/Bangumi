/*
 * @Author: czy0729
 * @Date: 2026-08-12 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-12 10:00:00
 */
import type { ViewStyle } from 'react-native'
import type { CarouselStyle } from '../types'

/** 轮播分页指示器 props */
export type PaginationProps = {
  /** 分页样式局部覆盖 */
  stylesOverride?: Partial<CarouselStyle>

  /** 是否纵向 */
  vertical: boolean

  /** 当前页 */
  current: number

  /** 页数 */
  count: number

  /** 未激活 dot 样式 */
  dotStyle?: ViewStyle

  /** 激活 dot 样式 */
  dotActiveStyle?: ViewStyle

  /** 点击圆点跳转到对应页 */
  onDotPress?: (index: number) => void
}

/** 单个圆点 props */
export type DotProps = {
  /** 是否激活 */
  active: boolean

  /** 合并后的样式 */
  styles: CarouselStyle

  /** 未激活 dot 样式 */
  dotStyle?: ViewStyle

  /** 激活 dot 样式 */
  dotActiveStyle?: ViewStyle

  /** 点击回调 */
  onPress?: () => void
}
