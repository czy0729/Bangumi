/*
 * @Author: czy0729
 * @Date: 2026-08-09 07:28:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-09 07:28:50
 */
import * as Haptics from 'expo-haptics'
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
  const separatorCount = items.filter(item => item.withSeparator).length
  const height =
    getMenuItemHeight() * items.length + (items.length - 1) + separatorCount * MENU_SEPARATOR_HEIGHT
  return Math.max(
    getMenuItemHeight(),
    Math.min(height, Math.floor(_.window.height * MENU_MAX_HEIGHT_RATIO))
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

/** 触发反馈 */
export function hapticFeedback(style: HapticFeedbackStyle) {
  switch (style) {
    case 'Selection':
      Haptics.selectionAsync()
      break
    case 'Light':
    case 'Medium':
    case 'Heavy':
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle[style])
      break
    case 'Success':
    case 'Warning':
    case 'Error':
      Haptics.notificationAsync(Haptics.NotificationFeedbackType[style])
      break
    default:
  }
}
