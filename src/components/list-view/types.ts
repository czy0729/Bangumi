/*
 * @Author: czy0729
 * @Date: 2022-05-17 04:49:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-05 01:05:00
 */
import { FlatListProps } from 'react-native'
import { Fn, ReactNode, ViewStyle, ListEmpty } from '@types'

export type Props = {
  style?: ViewStyle

  contentContainerStyle?: FlatListProps<any>['contentContainerStyle']

  /** 此函数用于为给定的 item 生成一个不重复的 key */
  keyExtractor?: (item?: object, index?: number) => string

  /** APP 约定列表数据结构 */
  data?: ListEmpty<any>

  /** 与 data 结构一致, https://www.react-native.cn/docs/sectionlist#section */
  sections?: any

  /** 自动把 data.list 中对象的这个 key 值转换为对应的 <SectionList> 的 sections */
  sectionKey?: string

  /** 多列布局只能在非水平模式下使用，即必须是horizontal={false}。此时组件内元素会从左到右从上到下按 Z 字形排列，类似启用了flexWrap的布局。组件内元素必须是等高的——暂时还无法支持瀑布流布局。 */
  numColumns?: FlatListProps<any>['numColumns']

  /** 当需要在指定的偏移处显示加载指示器的时候，就可以设置这个值 (Android) */
  progressViewOffset?: number

  /** <RefreshControl> pass props */
  refreshControlProps?: object

  /** 用来渲染每一个 section 中的每一个列表项的默认渲染器 */
  renderItem?: (
    item?: any,
    index?: number,
    section?: object,
    separators?: object
  ) => ReactNode

  /** 有 sections 才生效 */
  renderSectionHeader?: any

  /** 列表顶部组件 */
  ListHeaderComponent?: FlatListProps<any>['ListHeaderComponent']

  /** 替代整个底部组件 */
  ListFooterComponent?: ReactNode

  /** 加载中文字 */
  footerRefreshingText?: string

  /** 加载失败文字 */
  footerFailureText?: string

  /** 没有更多数据文字 */
  footerNoMoreDataText?: string

  /** 没有更多数据的组件 */
  footerNoMoreDataComponent?: ReactNode

  /** 空数据文字 */
  footerEmptyDataText?: string

  /** 空数据的组件 */
  footerEmptyDataComponent?: ReactNode

  /** 底部 <Text> 的 type */
  footerTextType?: string

  /** 是否显示底部 */
  showFooter?: boolean

  /** 是否显示底部看板娘 */
  showMesume?: boolean

  /** 是否开启预设的通用长列表优化 */
  optimize?: boolean

  /** 自动在顶部补充一区域, 点击列表返回到顶 (Android) */
  scrollToTop?: boolean

  /** 当有值, 初始化时当数组长度超过此长度, 会先渲染这个条数的数据, 再正常渲染 */
  lazy?: number

  /** 此属性对于 iOS 需要有默认值, 否则会出现首次渲染滚动条位置不正确的问题 (iOS) */
  scrollIndicatorInsets?: {
    top?: number
    left?: number
    bottom?: number
    right?: number
  }

  /** 顶部刷新回调 */
  onHeaderRefresh?: Fn

  /** 底部加载下一页回调 */
  onFooterRefresh?: Fn
}

export type RenderListProps = Omit<
  Props,
  | 'style'
  | 'data'
  | 'lazy'
  | 'optimize'
  | 'progressViewOffset'
  | 'refreshControlProps'
  | 'scrollToTop'
  | 'showFooter'
  | 'showsHorizontalScrollIndicator'
  | 'showsVerticalScrollIndicator'
>

export type ScrollToFunction = (params?: object) => any

export type ListProps = {
  connectRef?: Fn
  animated?: boolean
  sections?: any
  sectionKey?: string
  data?: ListEmpty<any>
}
