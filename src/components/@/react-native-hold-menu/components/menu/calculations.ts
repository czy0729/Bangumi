/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:50:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 06:19:29
 */
import type Animated from 'react-native-reanimated'
import { BLURVIEW_TINT_DARK } from '../../../ds'
import { MENU_WIDTH } from '../../constants'
import {
  MENU_TEXT_DARK_COLOR,
  MENU_TEXT_DESTRUCTIVE_COLOR_DARK,
  MENU_TEXT_DESTRUCTIVE_COLOR_LIGHT,
  MENU_TEXT_LIGHT_COLOR,
  MENU_TITLE_COLOR
} from './constants'

import type { MenuInternalProps } from './types'

export const leftOrRight = (menuProps: Animated.SharedValue<MenuInternalProps>) => {
  'worklet'

  const anchorPositionHorizontal = menuProps.value.anchorPosition.split('-')[1]
  const itemWidth = menuProps.value.itemWidth

  let leftPosition = 0
  anchorPositionHorizontal === 'right'
    ? (leftPosition = -MENU_WIDTH + itemWidth)
    : anchorPositionHorizontal === 'left'
    ? (leftPosition = 0)
    : (leftPosition = -menuProps.value.itemWidth - MENU_WIDTH / 2 + menuProps.value.itemWidth / 2)

  return leftPosition
}

export const getColor = (
  isTitle: boolean | undefined,
  isDestructive: boolean | undefined,
  themeValue: 'light' | 'extraLight' | 'dark'
) => {
  'worklet'
  return isTitle
    ? MENU_TITLE_COLOR
    : isDestructive
    ? themeValue === BLURVIEW_TINT_DARK
      ? MENU_TEXT_DESTRUCTIVE_COLOR_DARK
      : MENU_TEXT_DESTRUCTIVE_COLOR_LIGHT
    : themeValue === BLURVIEW_TINT_DARK
    ? MENU_TEXT_DARK_COLOR
    : MENU_TEXT_LIGHT_COLOR
}
