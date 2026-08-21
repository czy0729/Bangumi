/*
 * @Author: czy0729
 * @Date: 2023-08-11 17:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-28 13:45:00
 */
import type { ComponentType } from 'react'
import type { FlatListProps, NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import type { Override, ReactNode, ViewStyle } from '@types'
import type { FlatListRef, Props as ListViewProps } from '../types'

/** 原生端列表组件属性，基于 ListViewProps 扩展 */
export type ListProps<ItemT> = Override<
  ListViewProps<ItemT>,
  {
    /** 连接列表引用，绑定滚动方法 */
    connectRef?: (ref: FlatListRef) => void

    /** 列表数据 */
    data?: ItemT[]

    /** 条目预估高度，提供后开启 getItemLayout + 高度缓存（仅 FlatList 生效） */
    estimatedItemHeight?: number

    /** 高度缓存重置标识，变化时整体重建为预估高度（含 ListView 头部刷新代号） */
    itemHeightKey?: string | number
  }
>

/** 传递给底层列表组件的通用基础属性，兼容 FlatList / SectionList / EnteringExiting */
export type BaseProps<ItemT> = Override<
  FlatListProps<ItemT>,
  {
    /** 列表引用 */
    ref?: ListViewProps<ItemT>['ref']

    /** 列表数据 */
    data?: ItemT[]

    /** 分组数据 */
    sections?: ListViewProps<ItemT>['sections']

    /** 是否移除屏幕外的子视图以优化性能 */
    removeClippedSubviews: boolean

    /** https://reactnative.dev/blog/2021/09/01/preparing-your-app-for-iOS-15-and-android-12#overscroll-effect */
    overScrollMode: 'never' | 'always'

    /** https://reactnative.dev/docs/scrollview#alwaysbouncehorizontal-ios */
    alwaysBounceHorizontal: false

    /** https://reactnative.dev/docs/scrollview#alwaysbouncevertical-ios */
    alwaysBounceVertical: false

    /** 是否禁用旧版实现 */
    legacyImplementation: false
  }
>

/** Web 端列表组件属性 */
export type ListPropsWeb<ItemT = unknown> = {
  /** 内容容器样式 */
  contentContainerStyle?: ViewStyle

  /** 条目唯一标识提取函数 */
  keyExtractor?: (item: ItemT, index: number) => string

  /** 分组数据（SectionList 模式） */
  sections?: ListViewProps<ItemT>['sections']

  /** 列表数据 */
  data: ItemT[]

  /** 分页信息 */
  pagination?: {
    page: number
    pageTotal: number
  }

  /** 列数，大于 1 时启用多列布局 */
  numColumns?: number

  /** 是否允许滚动 */
  scrollEnabled?: boolean

  /** 是否显示底部区域 */
  showFooter?: boolean

  /** 列表头部组件 */
  ListHeaderComponent?: ComponentType<{}> | ReactNode

  /** 渲染分组头部 */
  renderSectionHeader?: (info: { section: { title: string; data: ItemT[] } }) => ReactNode

  /** 渲染单个条目 */
  renderItem: (info: {
    item: ItemT
    index?: number
    section?: { title: string; data: ItemT[] }
  }) => ReactNode

  /** 底部区域内容 */
  renderFooter?: ReactNode

  /** 是否反转列表 */
  inverted?: boolean

  /** 底部加载回调 */
  onFooterRefresh?: () => void

  /** 滚动事件回调 */
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}
