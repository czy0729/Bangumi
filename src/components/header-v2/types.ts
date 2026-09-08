/*
 * @Author: czy0729
 * @Date: 2024-11-22 07:52:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 01:30:00
 */
import type { ReactNode, TextStyle, ViewStyle, ColorValue } from '@types'
import type { TrackProps } from '../track'

/** 预设的状态栏主题 */
export type StatusBarEventsType = 'Subject' | 'Topic' | 'Tinygrail'

/** 公共属性 */
type CommonProps = {
  /** 标题文字 */
  title?: string

  /** [WEB] 页面标题, 有值时优先于 title */
  domTitle?: string

  /** 埋点参数: [URL 地址, 页面 key] */
  hm?: TrackProps['hm']

  /** 埋点别名, 便于日志区分页面 */
  alias?: string

  /** 文字颜色 (包括返回按钮箭头) */
  color?: ColorValue

  /** 覆写后退点击回调 */
  onBackPress?: () => void

  /** 右侧节点渲染函数 */
  headerRight?: () => ReactNode
}

/** 静态自绘头属性 (不传 mode) */
export type StaticProps = CommonProps & {
  /** 不传 mode 时使用静态自绘头 */
  mode?: undefined

  /** 透明头部, 隐藏标题并使用透明背景 */
  transparent?: boolean

  /** 头部背景容器样式 */
  backgroundStyle?: ViewStyle

  /** 标题容器 (Flex) 样式 */
  headerTitleStyle?: ViewStyle

  /** 标题文字大小 (默认 16) */
  headerTitleSize?: number

  /** 标题对齐方式, 默认居中 */
  headerTitleAlign?: 'center' | 'left'

  /** 追加在标题文字之后的节点 */
  headerTitleAppend?: ReactNode

  /** 标题文字样式 */
  headerTitleTextStyle?: TextStyle
}

/** 模式头属性 (transition / float) */
export type ModeProps = CommonProps & {
  /**
   * 模式
   * - transition: 滚动驱动的渐显头部 (fixed 由页面 onScroll 控制)
   * - float: 常驻自绘头部 (忽略 fixed, 恒可见)
   */
  mode: 'float' | 'transition'

  /** 头部是否固定, transition 模式下驱动渐显动画 */
  fixed?: boolean

  /** 预设的状态栏主题, 决定返回按钮等元素的亮暗色 */
  statusBarEventsType?: StatusBarEventsType

  /** 左侧节点, 渲染在返回按钮之后 */
  headerLeft?: ReactNode

  /** 自定义标题节点, 代替 title 显示 */
  headerTitle?: ReactNode
}

/** HeaderV2 组件属性 (mode 为判别键, 静态与模式互斥) */
export type Props = StaticProps | ModeProps

/** HeaderV2 头部逻辑参数 */
export type UseHeaderV2Options = {
  headerRight?: CommonProps['headerRight']
  headerTitleAlign?: StaticProps['headerTitleAlign']
  headerTitleStyle?: StaticProps['headerTitleStyle']
}

/** HeaderV2 头部逻辑返回值 */
export type UseHeaderV2Result = {
  /** 包裹 StoreContext.Provider 后的右侧渲染函数, 仅用于原生头部 setOptions (自绘头部渲染在树内, 直接用原始 headerRight) */
  bridgedHeaderRight?: Props['headerRight']

  /** 按设备适配的标题对齐 */
  headerTitleAlignValue: 'center' | 'left'

  /** 按设备适配的标题容器样式 */
  headerTitleStyleValue?: ViewStyle
}
