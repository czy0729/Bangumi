/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:28:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-10 10:30:00
 */
import { _ } from '@stores'
import {
  MENU_GAP,
  MENU_ITEM_PADDING_VERTICAL,
  MENU_MARGIN,
  MENU_MAX_HEIGHT_RATIO,
  MENU_MAX_WIDTH,
  MENU_SEPARATOR_HEIGHT,
  MENU_WIDTH_RATIO
} from './ds'

import type { HapticFeedbackStyle, MenuItemProps, MenuOpenParams } from './types'

/** 菜单项高度, 与 Text 组件实际行高保持一致 */
export const getMenuItemHeight = () => {
  const lineHeight = Math.floor((16 + _.fontSizeAdjust) * _.lineHeightRatio)
  return lineHeight + _.r(MENU_ITEM_PADDING_VERTICAL) * 2
}

/** 菜单高度, 超过屏幕高度上限会被压缩, 至少为单项高度保证常驻 BlurView 有效尺寸 */
export const getMenuHeight = (items: MenuItemProps[]) => {
  return Math.max(
    getMenuItemHeight(),
    Math.min(getMenuContentHeight(items), Math.floor(_.window.height * MENU_MAX_HEIGHT_RATIO))
  )
}

/**
 * 菜单内容高度估算 (未压缩), 仅用于确定菜单容器高度
 * 拖动命中不使用此值, 而是用 onLayout 实测的 rowOffsets, 避免逐项累积误差
 */
export function getMenuContentHeight(items: MenuItemProps[]) {
  const separatorCount = items.filter(item => item.withSeparator).length
  return (
    getMenuItemHeight() * items.length +
    Math.max(items.length - 1, 0) * _.hairlineWidth +
    separatorCount * MENU_SEPARATOR_HEIGHT
  )
}

/** 菜单宽度 */
export const getMenuWidth = () => {
  return Math.min(_.window.width * MENU_WIDTH_RATIO, MENU_MAX_WIDTH)
}

/** 计算菜单位置, 菜单放不下时让菜单与按钮整体位移 (tY) */
export const getMenuPosition = (params: MenuOpenParams, paddingBottom: number) => {
  const { anchorX, anchorY, anchorWidth, anchorHeight, bottom, disableMove } = params
  const width = getMenuWidth()
  const height = getMenuHeight(params.items)
  const safeBottom = _.window.height - paddingBottom - MENU_MARGIN

  let left = anchorX + anchorWidth - width
  if (left < MENU_MARGIN) left = anchorX
  left = Math.max(MENU_MARGIN, Math.min(left, _.window.width - width - MENU_MARGIN))

  // 固定锚定: 默认在按钮下方, bottom 时在按钮上方, 放不下时整体位移而不是换边
  const below = !bottom
  const top = below ? anchorY + anchorHeight + MENU_GAP : anchorY - height - MENU_GAP

  let tY = 0
  if (!disableMove) {
    if (below && top + height > safeBottom) {
      tY = safeBottom - (top + height)
    } else if (!below && top < MENU_MARGIN) {
      tY = MENU_MARGIN - top
    }
  }

  const finalTop = top + tY
  const originY = below ? finalTop : finalTop + height

  const rightAligned = Math.abs(left + width - (anchorX + anchorWidth)) <= 8
  const leftAligned = Math.abs(left - anchorX) <= 8
  const originX = rightAligned ? left + width : leftAligned ? left : left + width / 2

  return {
    left,
    top,
    width,
    height,
    originX,
    originY,
    tY
  }
}

/** 依据内容纵坐标计算悬停菜单项索引, 项间 1px 分隔与 separator 区域归前一项 (worklet) */
export function findMenuItemIndex(y: number, offsets: number[], contentHeight: number) {
  'worklet'
  if (y < 0 || y >= contentHeight) return -1
  let index = -1
  for (let i = 0; i < offsets.length; i++) {
    if (y >= offsets[i]) index = i
  }
  return index
}

/**
 * 依据手指窗口坐标解析悬停菜单项索引 (worklet)
 * 手指移出菜单矩形范围 (横竖都判) 即返回 -1 取消高亮, 松手不会误选边缘项
 */
export function resolveHoverIndex({
  absoluteX,
  absoluteY,
  menuLeft,
  menuTop,
  width,
  height,
  scrollOffset,
  rowOffsets,
  selectable,
  contentHeight
}: {
  /** 手指窗口横坐标 */
  absoluteX: number

  /** 手指窗口纵坐标 */
  absoluteY: number

  /** 菜单左边缘窗口横坐标 */
  menuLeft: number

  /** 菜单顶部窗口纵坐标 (含位移 tY) */
  menuTop: number

  /** 菜单宽度 */
  width: number

  /** 菜单可视高度 */
  height: number

  /** 内容滚动偏移 */
  scrollOffset: number

  /** 菜单项起始纵坐标 (实测) */
  rowOffsets: number[]

  /** 菜单项是否可选 */
  selectable: boolean[]

  /** 内容完整高度 (实测) */
  contentHeight: number
}) {
  'worklet'
  if (absoluteX < menuLeft || absoluteX >= menuLeft + width) return -1

  const y = absoluteY - menuTop
  if (y < 0 || y >= height) return -1

  const index = findMenuItemIndex(y + scrollOffset, rowOffsets, contentHeight)
  return index >= 0 && selectable[index] ? index : -1
}

/** expo-haptics 较轻, 函数内懒加载以移出启动求值链 (HoldMenuProvider iOS 启动必经) */
function syncHaptics(): typeof import('expo-haptics') {
  return require('expo-haptics') as typeof import('expo-haptics')
}

/** 触发反馈 */
export function hapticFeedback(style: HapticFeedbackStyle) {
  switch (style) {
    case 'Selection':
      syncHaptics().selectionAsync()
      break
    case 'Light':
    case 'Medium':
    case 'Heavy':
      syncHaptics().impactAsync(syncHaptics().ImpactFeedbackStyle[style])
      break
    case 'Success':
    case 'Warning':
    case 'Error':
      syncHaptics().notificationAsync(syncHaptics().NotificationFeedbackType[style])
      break
    default:
  }
}
