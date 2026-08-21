/*
 * @Author: czy0729
 * @Date: 2022-05-17 04:49:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-28 13:03:34
 */
import type { FlatList, FlatListProps, SectionListScrollParams } from 'react-native'
import type { ListEmpty, MaybeReadonly, Override, ReactNode, Ref, Sections } from '@types'
import type { TextProps } from '../text'
import type { REFRESH_STATE } from './ds'

/** 提取出 FlatList 类的实例类型，用于 ref 暴露滚动方法 */
export type ListViewInstance = InstanceType<typeof FlatList>

/** ListView 主组件属性，基于 FlatListProps 扩展 */
export type Props<ItemT = unknown> = Override<
  FlatListProps<ItemT>,
  {
    /** 列表引用，暴露 scrollToIndex / scrollToOffset 等滚动方法 */
    ref?: Ref<ListViewInstance> | ((ref?: ListViewInstance) => void)

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

    /** 分组数据，传入则自动使用 SectionList 渲染 */
    sections?: Sections<ItemT>

    /** 开启 SectionList 模式后，自动将 data.list 中该项的指定 key 映射为 section title */
    sectionKey?: string

    /** 刷新指示器的垂直偏移，当刷新控件不在最顶部时需要设置 (Android) */
    progressViewOffset?: number

    /** 透传给 RefreshControl 的额外属性 */
    refreshControlProps?: object

    /** 渲染分组头部，仅在 SectionList 模式下生效 */
    renderSectionHeader?: (info: { section: { title: string; data: ItemT[] } }) => ReactNode

    /** 自定义底部组件，替代默认 Footer */
    ListFooterComponent?: ReactNode

    /** 加载中底部文字 */
    footerRefreshingText?: string

    /** 加载失败底部文字 */
    footerFailureText?: string

    /** 没有更多数据底部文字 */
    footerNoMoreDataText?: string

    /** 没有更多数据时的自定义组件，优先级高于 footerNoMoreDataText */
    footerNoMoreDataComponent?: ReactNode

    /** 空数据底部文字 */
    footerEmptyDataText?: string

    /** 空数据时的自定义组件，优先级高于 footerEmptyDataText */
    footerEmptyDataComponent?: ReactNode

    /** 底部文字样式，透传给 Text 的 type */
    footerTextType?: TextProps['type']

    /** 是否显示底部组件 */
    showFooter?: boolean

    /** 是否显示底部看板娘 */
    showMesume?: boolean

    /** 是否开启预设的通用长列表优化（降低 maxToRenderPerBatch / windowSize 等） */
    optimize?: boolean

    /** 每批渲染的最大条目数，覆盖 optimize 预设值（用于按列表摊薄挂载） */
    maxToRenderPerBatch?: number

    /** 更新批次的时间间隔（毫秒），覆盖 optimize 预设值 */
    updateCellsBatchingPeriod?: number

    /**
     * 条目预估高度，提供后开启 getItemLayout + 高度缓存，减少挂载期测量；
     * 此时 ListHeaderComponent 需为稳定引用（内联函数组件会导致 header 子树反复 remount）
     */
    estimatedItemHeight?: number

    /**
     * 高度缓存重置标识，变化时整体重建为预估高度（用于切换到不同实体）；
     * 头部刷新结束视为整批替换数据，缓存会自动重建；追加分页保留已测量高度
     */
    itemHeightKey?: string | number

    /** @deprecated 点击列表顶部区域自动回顶（Android 专用） */
    scrollToTop?: boolean

    /** 滚动条与边缘的距离（iOS 滚动条初始位置修正） */
    scrollIndicatorInsets?: {
      top?: number
      left?: number
      bottom?: number
      right?: number
    }

    /** 启用分组吸顶效果（Android 需要显式开启） */
    stickySectionHeadersEnabled?: boolean

    /** 下拉刷新回调 */
    onHeaderRefresh?: () => void

    /** 上滑加载更多回调 */
    onFooterRefresh?: () => void
  }
>

/** 列表刷新状态枚举 */
export type RefreshState = (typeof REFRESH_STATE)[keyof typeof REFRESH_STATE]

/** 列表组件内部状态 */
export type State = {
  /** 当前刷新状态 */
  refreshState: RefreshState
}

/** 传给列表渲染子组件（List）的属性，去掉了容器层独享的字段 */
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

/** 滚动到指定索引 */
export type ScrollToIndex = (params: {
  /** 是否使用动画 */
  animated?: boolean

  /** 目标索引 */
  index: number

  /** 目标上方额外偏移 */
  viewOffset?: number

  /** 目标在可见区域的相对位置（0=顶部，0.5=居中，1=底部） */
  viewPosition?: number
}) => void

/** 滚动到指定偏移量 */
export type ScrollToOffset = (params: {
  /** 是否使用动画 */
  animated?: boolean

  /** 偏移量 */
  offset: number
}) => void

/** 滚动到指定条目 */
export type ScrollToItem = <ItemT>(params: {
  /** 是否使用动画 */
  animated?: boolean

  /** 目标条目 */
  item: ItemT

  /** 目标上方额外偏移 */
  viewOffset?: number

  /** 目标在可见区域的相对位置（0=顶部，0.5=居中，1=底部） */
  viewPosition?: number
}) => void

/** 滚动到底部 */
export type ScrollToEnd = (params?: {
  /** 是否使用动画 */
  animated?: boolean
}) => void

/** 滚动到 SectionList 指定分组的位 */
export type ScrollToLocation = (params: SectionListScrollParams) => void

/** 通过 useImperativeHandle 暴露给外部的滚动控制方法合集 */
export type ListViewScrollMethods = {
  /** 滚动到指定索引 */
  scrollToIndex?: ScrollToIndex

  /** 滚动到指定偏移量 */
  scrollToOffset?: ScrollToOffset

  /** 滚动到指定条目 */
  scrollToItem?: ScrollToItem

  /** 滚动到底部 */
  scrollToEnd?: ScrollToEnd

  /** 滚动到 SectionList 指定位置 */
  scrollToLocation?: ScrollToLocation

  /** 获取原始 FlatList ref，用于安卓端 measureLayout */
  getInnerRef?: () => FlatListRef | null
}

/** FlatList / SectionList 的完整 ref 类型，包含 RN 内部虚拟化列表属性 */
export type FlatListRef = ListViewInstance & {
  /** 内部 WrapperList 引用（RN 私有） */
  _wrapperListRef?: {
    /** 内部列表引用 */
    _listRef?: {
      /** 滚动到指定偏移量 */
      scrollToOffset?: ScrollToOffset

      /** 滚动到底部 */
      scrollToEnd?: ScrollToEnd
    }
  }

  /** 滚动到 SectionList 指定位置 */
  scrollToLocation?: ScrollToLocation
}
