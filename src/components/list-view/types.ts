/*
 * @Author: czy0729
 * @Date: 2022-05-17 04:49:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-05 03:51:33
 */
import type { FlatList, FlatListProps, SectionListScrollParams } from 'react-native'
import type { ListEmpty, MaybeReadonly, Override, ReactNode, Ref, Sections } from '@types'
import type { TextProps } from '../text'
import type { REFRESH_STATE } from './ds'

/** 提取出 FlatList 类的实例类型，用于 ref 暴露滚动方法 */
export type ListViewInstance = InstanceType<typeof FlatList>

/** ListView 主组件属性，基于 FlatListProps 扩展 */
export type Props<ItemT = any> = Override<
  FlatListProps<ItemT>,
  {
    /** 列表引用，暴露 scrollToIndex 等滚动方法 */
    ref?:
      | Ref<ListViewInstance>
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      | ((ref?: ListViewInstance) => void)

    /** 是否使用 Animated.ListView 渲染 */
    animated?: boolean

    /** 是否使用 Reanimated.FlatList 渲染带有进场出场动画的列表, 值为使用动画的最前项的个数 */
    skipEnteringExitingAnimations?: number

    /** 客户端约定列表数据结构 */
    data?: MaybeReadonly<
      Override<
        ListEmpty<ItemT>,
        {
          pagination?: {
            page: number
            pageTotal: number
          }
        }
      >
    >

    /** 与 data 结构一致, https://www.react-native.cn/docs/sectionlist#section */
    sections?: Sections<ItemT>

    /** 自动把 data.list 中对象的这个 key 值转换为对应的 SectionList 的 sections */
    sectionKey?: string

    /** 当需要在指定的偏移处显示加载指示器的时候，就可以设置这个值 (Android) */
    progressViewOffset?: number

    /** RefreshControl pass props */
    refreshControlProps?: object

    /** 有 sections 才生效 */
    renderSectionHeader?: (info: { section: { title: string; data: any[] } }) => ReactNode

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
    footerTextType?: TextProps['type']

    /** 是否显示底部 */
    showFooter?: boolean

    /** 是否显示底部看板娘 */
    showMesume?: boolean

    /** 是否开启预设的通用长列表优化 */
    optimize?: boolean

    /** @deprecated 自动在顶部补充一区域, 点击列表返回到顶 (Android) */
    scrollToTop?: boolean

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

/** 列表刷新状态枚举类型，取自 REFRESH_STATE 常量 */
export type RefreshState = (typeof REFRESH_STATE)[keyof typeof REFRESH_STATE]

/** 列表内部状态 */
export type State = {
  /** 当前刷新状态 */
  refreshState: RefreshState
}

/** 渲染列表主体时传递的属性，从 Props 中去除与容器相关的字段 */
export type RenderListProps<ItemT> = Omit<
  Props<ItemT>,
  | 'style'
  | 'optimize'
  | 'progressViewOffset'
  | 'refreshControlProps'
  | 'scrollToTop'
  | 'showFooter'
  | 'showsHorizontalScrollIndicator'
  | 'showsVerticalScrollIndicator'
>

/** 滚动到指定索引位置的参数 */
export type ScrollToIndex = (params: {
  animated?: boolean
  index: number
  viewOffset?: number
  viewPosition?: number
}) => void

/** 滚动到指定偏移量的参数 */
export type ScrollToOffset = (params: { animated?: boolean; offset: number }) => void

/** 滚动到指定条目的参数 */
export type ScrollToItem = <ItemT>(params: {
  animated?: boolean
  item: ItemT
  viewOffset?: number
  viewPosition?: number
}) => void

/** 滚动到底部的参数 */
export type ScrollToEnd = (params?: { animated?: boolean }) => void

/** 滚动到 SectionList 指定位置的参数 */
export type ScrollToLocation = (params: SectionListScrollParams) => void

/** useImperativeHandle 暴露给外部的滚动方法 */
export type ListViewScrollMethods = {
  scrollToIndex?: ScrollToIndex
  scrollToOffset?: ScrollToOffset
  scrollToItem?: ScrollToItem
  scrollToEnd?: ScrollToEnd
  scrollToLocation?: ScrollToLocation

  /** 获取原始的 FlatList ref，用于安卓端 measureLayout */
  getInnerRef?: () => FlatListRef | null
}

/** FlatList / SectionList ref 类型，包含 RN 内部虚拟化列表属性 */
export type FlatListRef = ListViewInstance & {
  _wrapperListRef?: {
    _listRef?: {
      scrollToOffset?: ScrollToOffset
      scrollToEnd?: ScrollToEnd
    }
  }
  scrollToLocation?: ScrollToLocation
}
