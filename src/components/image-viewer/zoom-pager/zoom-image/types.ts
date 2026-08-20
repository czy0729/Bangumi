/*
 * @Author: czy0729
 * @Date: 2026-08-19 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-19 20:04:52
 */
import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

/** 点击/长按事件参数 */
export type ClickEvent = {
  locationX: number
  locationY: number
  pageX: number
  pageY: number

  /** 所属图片下标 */
  imageIndex?: number
}

/** 移动事件参数 */
export type MoveEvent = {
  type: string
  positionX: number
  positionY: number
  scale: number
  zoomCurrentDistance: number
}

export type Props = {
  /** 操作区域宽度 */
  cropWidth: number

  /** 操作区域高度 */
  cropHeight: number

  /** 图片宽度 */
  imageWidth: number

  /** 图片高度 */
  imageHeight: number

  /** 所属图片下标 */
  imageIndex?: number

  /** 单指移动 */
  panToMove?: boolean

  /** 多指缩放 */
  pinchToZoom?: boolean

  /** 双击放大 */
  enableDoubleClickZoom?: boolean

  /** 单击最大位移 */
  clickDistance?: number

  /** 横向最大溢出 */
  maxOverflow?: number

  /** 长按触发时长 (ms) */
  longPressTime?: number

  /** 双击判定最大间隔 (ms) */
  doubleClickInterval?: number

  /** 外层样式 */
  style?: StyleProp<ViewStyle>

  /** 下滑关闭阈值 */
  swipeDownThreshold?: number

  /** 允许下滑关闭 */
  enableSwipeDown?: boolean

  /** 缩放小于 1 时复位 */
  enableCenterFocus?: boolean

  /** 最小缩放 */
  minScale?: number

  /** 最大缩放 */
  maxScale?: number

  /** 单击回调 */
  onClick?: (event: ClickEvent) => void

  /** 双击回调 */
  onDoubleClick?: (event: ClickEvent) => void

  /** 长按回调 */
  onLongPress?: (event: ClickEvent) => void

  /** 横向溢出偏移回调 */
  horizontalOuterRangeOffset?: (offsetX: number) => void

  /** 手势结束回调 */
  responderRelease?: (vx: number, scale: number) => void

  /** 移动回调 */
  onMove?: (event: MoveEvent) => void

  /** 下滑回调 */
  onSwipeDown?: () => void

  /** 内容 */
  children?: ReactNode
}

/** useZoomImage 参数 */
export type UseZoomImageOptions = Omit<Props, 'children' | 'style'>
