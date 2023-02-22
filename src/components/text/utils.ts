/*
 * @Author: czy0729
 * @Date: 2022-05-01 12:03:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 08:32:47
 */
import { Text, TextInput } from 'react-native'
import { _ } from '@stores'
import { setDefaultProps } from '@utils'
import { s2t } from '@utils/thirdParty/cn-char'
import { PAD, IOS } from '@constants'

/** 平板设备统一放大单位 */
export const PAD_INCREASE = PAD === 2 ? 4 : 2

/** 强制给内部组件注入默认参数 */
export function setComponentsDefaultProps() {
  if (IOS) return

  setDefaultProps(Text, _.fontStyle)
  setDefaultProps(TextInput, _.fontStyle)
}

/** 文字自适应增加行高 */
export function computedLineHeight(
  size?: number,
  lineHeight?: number,
  lineHeightIncrease?: number,
  contextLineHeightIncrease?: number
) {
  const _lineHeightIncrease =
    (lineHeightIncrease === undefined
      ? contextLineHeightIncrease
      : lineHeightIncrease) + _.device(0, PAD_INCREASE)

  if (lineHeight !== undefined || _lineHeightIncrease) {
    const _lineHeight = Math.max(lineHeight || 14, size) + _lineHeightIncrease
    return _lineHeight <= 2 + _lineHeightIncrease
      ? _lineHeight * (size + _.fontSizeAdjust)
      : (_lineHeight + _.fontSizeAdjust) * _.lineHeightRatio
  }
}

/** 文字递归简转繁 */
export function format(children: any) {
  if (typeof children === 'string') return s2t(children)
  if (Array.isArray(children)) return children.map(item => format(item))
  return children
}
