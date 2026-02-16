/*
 * @Author: czy0729
 * @Date: 2022-05-01 12:03:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-04 17:48:19
 */
import { Text, TextInput } from 'react-native'
import { _ } from '@stores'
import { setDefaultProps } from '@utils'
import { s2t } from '@utils/thirdParty/open-cc'
import { IOS, PAD, WEB } from '@constants'
import { memoStyles } from './styles'
import { Props as TextProps } from './types'

/** 平板设备统一放大单位 */
export const PAD_INCREASE = PAD === 2 ? 4 : 2

/** 强制给内部组件注入默认参数 */
export function setComponentsDefaultProps() {
  if (IOS || WEB) return

  /** @ts-ignore */
  setDefaultProps(Text, _.fontStyle)

  /** @ts-ignore */
  setDefaultProps(TextInput, _.fontStyle)
}

/** 文字自适应增加行高 */
export function computedLineHeight(
  size: number = 14,
  lineHeight: number = size,
  lineHeightIncrease: number = 0
) {
  const lhc = lineHeightIncrease + _.device(0, PAD_INCREASE)
  if (lineHeight !== undefined || lhc) {
    const lh = Math.max(lineHeight || 14, size) + lhc
    return Math.floor(
      lh <= 2 + lhc ? lh * (size + _.fontSizeAdjust) : (lh + _.fontSizeAdjust) * _.lineHeightRatio
    )
  }
}

/** 文字递归简转繁 */
export function format(children: any) {
  if (typeof children === 'string') return s2t(children)

  if (Array.isArray(children)) return children.map(item => format(item))

  return children
}

/** 计算文字样式 */
export function getTextStyle({
  style,
  overrideStyle,
  type = 'desc',
  size = 14,
  lineHeight,
  lineHeightIncrease,
  align,
  bold = false,
  underline = false,
  shadow = false,
  shrink = false,
  noWrap = false
}: Partial<TextProps>) {
  const styles = memoStyles()
  const textStyle: TextProps['style'][] = [styles.base]

  if (type) textStyle.push(styles[type])
  if (underline) textStyle.push(styles.underline)
  if (size) textStyle.push(_[`fontSize${size + _.device(0, PAD_INCREASE)}`])

  const _lineHeight = computedLineHeight(size, lineHeight, lineHeightIncrease)
  if (_lineHeight) {
    if (WEB) {
      textStyle.push({
        lineHeight: Math.max(_lineHeight - 1, 15),
        minHeight: Math.max(_lineHeight, 15)
      })
    } else {
      textStyle.push({
        lineHeight: _lineHeight
      })
    }
  }

  if (align && align !== 'left')
    textStyle.push(align === 'right' ? styles.alignRight : styles.alignCenter)
  if (shadow) textStyle.push(styles.shadow)
  if (shrink) textStyle.push(styles.shrink)
  if (noWrap) textStyle.push(styles.noWrap)
  if (style) textStyle.push(style)

  /**
   * 若需要设置字体, rn 环境下与 web 不同, 若 font-weight 设置是该字体没有支持的,
   * 依然不会显示成该字体, 所以需要在最后设置
   */
  textStyle.push(styles.text)
  if (bold) textStyle.push(styles.bold)
  if (overrideStyle) textStyle.push(overrideStyle)

  return textStyle
}
