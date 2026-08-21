/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 14:00:00
 */
import type { ComponentType, ReactElement } from 'react'
import type { NativeScrollEvent, NativeSyntheticEvent, StyleProp, ViewStyle } from 'react-native'
import type { ListArray, ListEmpty, MaybeReadonly, ReactNode, Sections } from '@types'
import type { FlatListRef, Props as ListViewProps, RefreshState, RenderListProps } from '../types'

/** 下拉刷新控制渲染参数 */
export type UseRenderRefreshControlOptions<ItemT> = {
  rawOnHeaderRefresh?: ListViewProps<ItemT>['onHeaderRefresh']
  refreshState: RefreshState
  data: MaybeReadonly<ListEmpty<ItemT>>
  progressViewOffset?: ListViewProps<ItemT>['progressViewOffset']
  refreshControlProps?: ListViewProps<ItemT>['refreshControlProps']
  onHeaderRefresh?: () => Promise<void> | void
}

/** 底部 Footer 渲染参数 */
export type UseRenderFooterOptions<ItemT> = {
  data: MaybeReadonly<ListEmpty<ItemT>>
  refreshState: RefreshState
} & Pick<
  ListViewProps<ItemT>,
  | 'footerEmptyDataComponent'
  | 'footerEmptyDataText'
  | 'footerFailureText'
  | 'footerNoMoreDataComponent'
  | 'footerRefreshingText'
  | 'footerTextType'
  | 'showMesume'
>

/** 通用列表属性计算参数 */
export type UseListCommonPropsOptions<ItemT> = {
  connectRef?: (ref: FlatListRef) => void
  renderFooter: () => ReactNode
  renderRefreshControl: () => ReactElement | null
  refreshState: RefreshState
  rawOnHeaderRefresh?: ListViewProps<ItemT>['onHeaderRefresh']
  onHeaderRefresh?: () => Promise<void> | void
  rawOnFooterRefresh?: ListViewProps<ItemT>['onFooterRefresh']
  onEndReached?: () => void
} & Pick<
  ListViewProps<ItemT>,
  | 'style'
  | 'showFooter'
  | 'ListFooterComponent'
  | 'optimize'
  | 'maxToRenderPerBatch'
  | 'updateCellsBatchingPeriod'
  | 'initialNumToRender'
>

/** 提取 T[K] 的函数签名，作为合并回调的参数类型 */
export type MergeHandler<T extends object, K extends keyof T> = T[K] extends (
  ...args: infer A
) => void
  ? (...args: A) => void
  : never

/** 滚动回调合并函数类型，与 useScrollProtection 保持一致 */
export type MergeScrollCallback = <
  T extends object,
  K extends { [P in keyof T]: T[P] extends Function ? P : never }[keyof T]
>(
  passProps: T,
  key: K,
  internal: MergeHandler<T, K>
) => void

/** 通用列表属性（useListCommonProps 返回值） */
export type CommonProps = {
  style?: StyleProp<ViewStyle>
  connectRef?: (ref: FlatListRef) => void
  ListHeaderComponentStyle?: StyleProp<ViewStyle>
  ListFooterComponentStyle?: StyleProp<ViewStyle>
  ListFooterComponent?: ReactNode
  refreshing?: boolean
  refreshControl?: ReactElement | null
  onRefresh?: () => void
  onEndReached?: () => void
  onEndReachedThreshold?: number
  maxToRenderPerBatch?: number
  updateCellsBatchingPeriod?: number
  initialNumToRender?: number
  windowSize?: number
  showsHorizontalScrollIndicator?: boolean
  showsVerticalScrollIndicator?: boolean
}

/** 列表主体渲染参数 */
export type UseRenderListOptions<ItemT> = {
  restProps: RenderListProps<ItemT>
  sectionKey: string
  rawSections?: Sections<ItemT>
  data: MaybeReadonly<ListEmpty<ItemT>>
  list: ListArray<ItemT>
  sections: Sections<ItemT>
  mergeScrollCallback: MergeScrollCallback
  onScrollBeginDrag: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void
  onScrollEndDrag: () => void
  onMomentumScrollEnd: () => void
  commonProps: CommonProps
  estimatedItemHeight?: number
  itemHeightKey?: string | number
  renderFooter: () => ReactNode
  onFooterRefresh?: ListViewProps<ItemT>['onFooterRefresh']
}

/** estimatedItemHeight 实现参数 */
export type UseEstimatedItemHeightOptions = {
  enabled: boolean
  dataLength: number
  estimate: number
  resetKey?: string | number

  /**
   * 列表头内容；须为稳定引用（useMemo 的元素或模块级组件），
   * 内联函数组件每次渲染类型变化会导致 header 子树 remount、内部状态丢失
   */
  header?: ReactNode | ComponentType
}

/** 列表数据计算参数 */
export type UseListDataOptions<ItemT> = {
  data: MaybeReadonly<ListEmpty<ItemT>>
  sectionKey?: string
  sections?: Sections<ItemT>
}

/** 刷新状态管理参数 */
export type UseRefreshStateOptions<ItemT> = {
  data: MaybeReadonly<ListEmpty<ItemT>>
  onHeaderRefresh?: () => Promise<void> | void
  onFooterRefresh?: () => void
}
