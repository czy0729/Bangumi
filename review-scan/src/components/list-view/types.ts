/*
 * @Author: czy0729
 * @Date: 2022-05-17 04:49:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-28 13:55:08
 */
import { FlatListProps, SectionListScrollParams } from 'react-native'
import { ListEmpty, Override, ReactNode } from '@types'
import { REFRESH_STATE } from './ds'

export type Props<ItemT> = Override<
  FlatListProps<ItemT>,
  {
    /** 是否使用 Animated.ListView 渲染 */
    animated?: boolean

    /** 是否使用 Reanimated.FlatList 渲染带有进场出场动画的列表, 值为使用动画的最前项的个数 */
    skipEnteringExitingAnimations?: number

    /** 客户端约定列表数据结构 */
    data?: Override<
      ListEmpty<ItemT>,
      {
        pagination?: {
          page: number
          pageTotal: number
        }
      }
    >

    /** 与 data 结构一致, https://www.react-native.cn/docs/sectionlist#section */
    sections?: any

    /** 自动把 data.list 中对象的这个 key 值转换为对应的 SectionList 的 sections */
    sectionKey?: string

    /** 当需要在指定的偏移处显示加载指示器的时候，就可以设置这个值 (Android) */
    progressViewOffset?: number

    /** RefreshControl pass props */
    refreshControlProps?: object

    /** 有 sections 才生效 */
    renderSectionHeader?: any

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

    /** 底部 Text 的 type */
    footerTextType?: string

    /** 是否显示底部 */
    showFooter?: boolean

    /** 是否显示底部看板娘 */
    showMesume?: boolean

    /** 是否开启预设的通用长列表优化 */
    optimize?: boolean

    /** @deprecated 自动在顶部补充一区域, 点击列表返回到顶 (Android) */
    scrollToTop?: boolean

    /** @deprecated 当有值, 初始化时当数组长度超过此长度, 会先渲染这个条数的数据, 再正常渲染 */
    lazy?: number

    /** 此属性对于 iOS 需要有默认值, 否则会出现首次渲染滚动条位置不正确的问题 (iOS) */
    scrollIndicatorInsets?: {
      top?: number
      left?: number
      bottom?: number
      right?: number
    }

    /** 嵌套滚动需要此值 (Android) */
    stickySectionHeadersEnabled?: boolean

    /** 顶部刷新回调 */
    onHeaderRefresh?: () => any

    /** 底部加载下一页回调 */
    onFooterRefresh?: () => any
  }
>

export type RefreshState = (typeof REFRESH_STATE)[keyof typeof REFRESH_STATE]

export type State = {
  refreshState: RefreshState

  /** @deprecated STORYBOOK */
  rendered: boolean
}

export type RenderListProps<ItemT> = Omit<
  Props<ItemT>,
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

export type ScrollToIndex = (params: {
  animated?: boolean
  index: number
  viewOffset?: number
  viewPosition?: number
}) => void

export type ScrollToOffset = (params: { animated?: boolean; offset: number }) => void

export type ScrollToItem = <ItemT>(params: {
  animated?: boolean
  item: ItemT
  viewOffset?: number
  viewPosition?: number
}) => void

export type ScrollToEnd = (params?: { animated?: boolean }) => void

export type ScrollToLocation = (params: SectionListScrollParams) => void
