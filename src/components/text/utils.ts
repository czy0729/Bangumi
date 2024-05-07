/*
 * @Author: czy0729
 * @Date: 2022-05-01 12:03:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-07 05:14:42
 */
import { Text, TextInput } from 'react-native'
import { _ } from '@stores'
import { setDefaultProps } from '@utils'
import { s2t } from '@utils/thirdParty/open-cc'
import { IOS, PAD } from '@constants'

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
