/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'

export type CarouselStyle = {
  pagination: ViewStyle
  paginationX: ViewStyle
  paginationY: ViewStyle
  pointStyle: ViewStyle
  pointActiveStyle: ViewStyle
  spaceStyle: ViewStyle
}

export type Props = {
  /** 切页完成后回调 */
  afterChange?: (index: number) => void

  /** 自动播放, 仅当 children 为数组时生效 */
  autoplay?: boolean

  /** 自动播放间隔 (ms), 默认 3000 */
  autoplayInterval?: number

  /** 边缘回弹, 默认 true */
  bounces?: boolean

  children?: ReactNode

  /** 激活 dot 样式覆盖 */
  dotActiveStyle?: object

  /** 未激活 dot 样式覆盖 */
  dotStyle?: object

  /** 是否显示分页指示, 默认 true */
  dots?: boolean

  /** 是否无限循环 */
  infinite?: boolean

  onScrollBeginDrag?: (...args: any[]) => void

  onMomentumScrollEnd?: (...args: any[]) => void

  /** 自定义分页渲染 */
  pagination?: (props: any) => ReactNode

  /** 初始页, 默认 0 */
  selectedIndex?: number

  /** 分页样式局部覆盖 (ant 风格的 Partial<CarouselStyle>) */
  styles?: Partial<CarouselStyle>

  /** 容器样式 */
  style?: object

  /** 是否纵向, 默认 false */
  vertical?: boolean
}