/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 09:00:04
 */
import { _ } from '@stores'
import { titleCase } from '@utils'

import type { TextStyle, ViewStyle } from '@types'
import type { Props } from './types'
import type { memoStyles } from './styles'

type ButtonStyles = ReturnType<typeof memoStyles>

/** 计算按钮容器/文字样式与是否加粗 */
export function getButtonStyles(
  styles: ButtonStyles,
  {
    type = 'plain',
    size = 'md',
    shadow = false,
    radius = true,
    style
  }: Pick<Props, 'type' | 'size' | 'shadow' | 'radius' | 'style'>,
  children?: Props['children']
): {
  wrapStyle: ViewStyle[]
  textStyle: TextStyle[]
  textBold: boolean
} {
  const wrapStyle: ViewStyle[] = [styles.button]
  const textStyle: TextStyle[] = [styles.text]
  let textBold = false

  if (shadow && !_.isDark && (type === 'plain' || type === 'ghostPlain')) {
    wrapStyle.push(styles.shadow)
  }

  if (type) {
    wrapStyle.push(styles[type])
    textStyle.push(styles[`text${titleCase(type)}`] as TextStyle)
  }

  if (radius) {
    wrapStyle.push(styles.radius)
  }

  if (size) {
    const textSize = `text${titleCase(size)}`
    wrapStyle.push(styles[size])

    if (textSize === 'textSm') {
      textBold = true

      if (
        (typeof children === 'string' || typeof children === 'number') &&
        String(children).length >= 5
      ) {
        textStyle.push(styles.textXs)
      } else {
        textStyle.push(styles.textSm)
      }
    } else {
      textStyle.push(styles[textSize] as TextStyle)
    }
  }

  if (style) {
    wrapStyle.push(style)
  }

  return {
    /** 容器样式数组 */
    wrapStyle,

    /** 文字样式数组 */
    textStyle,

    /** 是否强制加粗文字 */
    textBold
  }
}
