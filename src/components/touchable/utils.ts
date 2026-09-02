/*
 * @Author: czy0729
 * @Date: 2021-12-29 17:25:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 00:42:40
 */
import { StyleSheet } from 'react-native'
import { _ } from '@stores'

import type { StyleProp, TextStyle, ViewStyle } from 'react-native'

export const defaultHitSlop = {
  top: _.device(3, 4),
  right: _.device(2, 4),
  bottom: _.device(3, 4),
  left: _.device(2, 4)
} as const

export const styles = _.create({
  touchable: {
    ..._.absoluteFill,
    zIndex: 1
  }
})

/** 分离出 containerStyle */
export function separateStyles<T extends ViewStyle | TextStyle>(
  styles: StyleProp<T>
): {
  containerStyle: T
  style: T
} {
  const {
    width,
    height,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginHorizontal,
    marginVertical,
    borderWidth,
    borderColor,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    overflow,
    ...otherStyle
  } = (StyleSheet.flatten(styles) as T) || {}
  const containerStyle = {
    width,
    height,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginHorizontal,
    marginVertical,
    borderWidth,
    borderColor,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    overflow
  } as T

  const style = { ...otherStyle } as T
  if (typeof width === 'number') style.width = width
  if (typeof height === 'number') style.height = height

  return {
    containerStyle,
    style
  }
}
