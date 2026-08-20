/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 20:24:51
 */
import type { ReactElement } from 'react'
import type {
  ImageURISource,
  LayoutChangeEvent,
  StyleProp,
  TextStyle,
  ViewStyle
} from 'react-native'
import type { AnimatedStyle } from 'react-native-reanimated'
import type { ClickEvent } from './zoom-image/types'

/** 图片信息 */
export type ImageInfo = {
  /** 图片地址 */
  url: string

  /** 图片宽度 (不传则自动拉取) */
  width?: number

  /** 图片高度 (不传则自动拉取) */
  height?: number

  /** 图片字节大小 (kb 为单位) */
  sizeKb?: number

  /** 原图字节大小 (kb 为单位) */
  originSizeKb?: number

  /** 原图 url 地址 */
  originUrl?: string

  /** 传给图片组件的 props */
  props?: {
    /** 图片源 (require 资源为数字) */
    source?: ImageURISource | number

    /** 图片样式 */
    style?: ViewStyle
  }

  /** 请求头 (如 auth、Referer) */
  headers?: Record<string, string>
}

/** 图片加载状态 */
export type ImageStatus = 'loading' | 'success' | 'fail'

/** 图片尺寸 */
export type ImageSize = {
  /** 宽度 */
  width: number

  /** 高度 */
  height: number

  /** 加载状态 */
  status: ImageStatus
}

/** 翻页方向 */
export type FlipDirection = 'back' | 'next' | 'reset'

/** renderImage 回调参数 */
export type RenderImageProps = {
  /** 图片源 (require 资源为数字) */
  source?: number | ImageURISource

  /** 样式 */
  style?: ViewStyle & { width?: number; height?: number }
}

/** 移动事件参数 */
export type MoveEvent = {
  type: string
  positionX: number
  positionY: number
  scale: number
  zoomCurrentDistance: number
}

/** 长按菜单渲染参数 */
export type MenuRenderParams = {
  /** 关闭菜单 */
  cancel: () => void

  /** 保存到本地 */
  saveToLocal: () => void
}

/** pager 动态样式 (依赖运行时宽高与背景色) */
export type PagerStyles = {
  /** 模态容器 */
  modalContainer: ViewStyle

  /** 查看原图容器 */
  watchOrigin: ViewStyle

  /** 查看原图按钮 */
  watchOriginTouchable: ViewStyle

  /** 查看原图文案 */
  watchOriginText: TextStyle

  /** 默认图片样式 */
  imageStyle: ViewStyle

  /** 内容容器 */
  container: ViewStyle

  /** 横滑容器 */
  moveBox: ViewStyle

  /** 菜单容器 */
  menuContainer: ViewStyle

  /** 菜单遮罩 */
  menuShadow: ViewStyle

  /** 菜单内容 */
  menuContent: ViewStyle

  /** 操作行 */
  operateContainer: ViewStyle

  /** 操作文案 */
  operateText: TextStyle

  /** 加载中占位 */
  loadingTouchable: ViewStyle

  /** 加载中容器 */
  loadingContainer: ViewStyle

  /** 左翻页容器 */
  arrowLeftContainer: ViewStyle

  /** 右翻页容器 */
  arrowRightContainer: ViewStyle
}

export type Props = {
  /** 图片数组 */
  imageUrls?: ImageInfo[]

  /** 滑动到下一页的 X 阈值 */
  flipThreshold?: number

  /** 当前页能滑到下一页的 X 位置最大值 */
  maxOverflow?: number

  /** 初始显示第几张图 */
  index?: number

  /** 加载失败的图 */
  failImageSource?: ImageInfo

  /** 背景颜色 */
  backgroundColor?: string

  /** footer 容器样式 */
  footerContainerStyle?: object

  /** 长按菜单文案 */
  menuContext?: {
    /** 保存到本地文案 */
    saveToLocal: string

    /** 取消文案 */
    cancel: string
  }

  /** 是否开启长按保存到本地 */
  saveToLocalByLongPress?: boolean

  /** 是否允许缩放图片 */
  enableImageZoom?: boolean

  /** 外层样式 */
  style?: ViewStyle

  /** 是否允许下滑关闭 */
  enableSwipeDown?: boolean

  /** 触发下滑关闭的阈值 */
  swipeDownThreshold?: number

  /** 双击判定最大间隔 (ms) */
  doubleClickInterval?: number

  /** 是否预加载图片 */
  enablePreload?: boolean

  /** 翻页动画时间 (ms) */
  pageAnimateTime?: number

  /** 长按图片回调 */
  onLongPress?: (image?: ImageInfo) => void

  /** 单击回调 */
  onClick?: (close?: () => void, currentShowIndex?: number) => void

  /** 双击回调 */
  onDoubleClick?: (close?: () => void) => void

  /** 图片保存到本地回调 */
  onSave?: (url: string) => void

  /** 移动回调 */
  onMove?: (position?: MoveEvent) => void

  /** 自定义头部 */
  renderHeader?: (currentIndex?: number) => ReactElement | null

  /** 自定义尾部 */
  renderFooter?: (currentIndex: number) => ReactElement | null

  /** 自定义指示器 */
  renderIndicator?: (currentIndex?: number, allSize?: number) => ReactElement | null

  /** 自定义图片渲染 */
  renderImage?: (props: RenderImageProps) => ReactElement | null

  /** 自定义左翻页按钮 */
  renderArrowLeft?: () => ReactElement | null

  /** 自定义右翻页按钮 */
  renderArrowRight?: () => ReactElement | null

  /** 取消看图的回调 */
  onCancel?: () => void

  /** 下滑时触发 */
  onSwipeDown?: () => void

  /** 渲染 loading 元素 */
  loadingRender?: () => ReactElement | null

  /** 当图片切换时触发 */
  onChange?: (index?: number) => void

  /** 长按菜单渲染函数 */
  menus?: (params: MenuRenderParams) => ReactElement | null
}

/** useZoomPager 参数 */
export type UseZoomPagerOptions = Pick<
  Props,
  | 'imageUrls'
  | 'index'
  | 'flipThreshold'
  | 'pageAnimateTime'
  | 'backgroundColor'
  | 'enablePreload'
  | 'saveToLocalByLongPress'
  | 'onCancel'
  | 'onSwipeDown'
  | 'onChange'
  | 'onLongPress'
  | 'onClick'
  | 'onDoubleClick'
>

/** useZoomPager 返回值 */
export type UseZoomPagerResult = {
  /** 视口尺寸 */
  viewport: {
    width: number
    height: number
  }

  /** 当前显示下标 */
  currentShowIndex: number

  /** 图片尺寸列表 */
  imageSizes: ImageSize[]

  /** 长按菜单是否显示 */
  isShowMenu: boolean

  /** pager 动态样式 */
  pagerStyles: PagerStyles

  /** 淡入动画样式 */
  fadeStyle: AnimatedStyle<StyleProp<ViewStyle>>

  /** 横滑动画样式 */
  moveStyle: AnimatedStyle<StyleProp<ViewStyle>>

  /** 完成布局 */
  handleLayout: (event: LayoutChangeEvent) => void

  /** 到上一张 */
  goBack: () => void

  /** 到下一张 */
  goNext: () => void

  /** 横向溢出偏移回调 */
  handleHorizontalOuterRangeOffset: (offsetX?: number) => void

  /** 手势结束回调 (缩放状态下不允许翻页) */
  handleResponderRelease: (vx?: number, scale?: number) => void

  /** 长按回调 */
  handleLongPress: (e?: ClickEvent) => void

  /** 单击回调 */
  handleClick: () => void

  /** 双击回调 */
  handleDoubleClick: () => void

  /** 下滑关闭 */
  handleSwipeDown: () => void

  /** 关闭菜单 */
  handleLeaveMenu: () => void

  /** 保存到本地 */
  handleSaveToLocal: () => void
}
