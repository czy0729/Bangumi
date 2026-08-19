/*
 * @Author: czy0729
 * @Date: 2024-11-22 07:52:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-20 22:12:03
 */
import type { ReactNode, TextStyle, ViewStyle, ColorValue } from '@types'
import type { TrackProps } from '../track'

/** HeaderV2 组件属性 */
export type Props = {
  /** 透明头部, 隐藏标题并使用透明背景 */
  transparent?: boolean

  /** 头部背景容器样式 */
  backgroundStyle?: ViewStyle

  /** @deprecated 未使用, 保留以兼容旧调用 */
  fixed?: boolean

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

  /** @deprecated 未使用, 保留以兼容旧调用 */
  headerLeft?: ReactNode

  /** @deprecated 未使用, 保留以兼容旧调用 */
  headerTitle?: ReactNode

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

  /** 右侧节点渲染函数 */
  headerRight?: () => ReactNode
}

/** HeaderV2 头部逻辑参数 */
export type UseHeaderV2Options = Pick<Props, 'headerRight' | 'headerTitleAlign' | 'headerTitleStyle'>

/** HeaderV2 头部逻辑返回值 */
export type UseHeaderV2Result = {
  /** 按设备适配的标题对齐 */
  headerTitleAlignValue: 'center' | 'left'

  /** 按设备适配的标题容器样式 */
  headerTitleStyleValue?: ViewStyle
}
