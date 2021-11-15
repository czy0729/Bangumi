/*
 * @Author: czy0729
 * @Date: 2019-08-13 19:46:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-15 20:37:20
 */
import React from 'react'
import { Text } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

export const bgmMap = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  ''
]

export const BgmText = observer(
  ({ style, index = 0, size = 14, lineHeight, children, ...other }) => {
    const _style = [styles.text]
    if (size) _style.push(styles[size])
    if (lineHeight !== undefined) {
      _style.push({
        lineHeight: lineHeight <= 2 ? lineHeight * size : lineHeight * _.lineHeightRatio
      })
    }
    if (style) _style.push(style)
    return (
      <Text style={_style} allowFontScaling={false} selectable {...other}>
        {children || bgmMap[index - 1]}
      </Text>
    )
  }
)

const styles = _.create({
  text: {
    fontFamily: 'bgm',
    fontWeight: 'normal',
    opacity: 1
  },
  10: _.fontSize(10),
  11: _.fontSize(11),
  12: _.fontSize(12),
  13: _.fontSize(13),
  14: _.fontSize(14),
  15: _.fontSize(15),
  16: _.fontSize(16),
  18: _.fontSize(18),
  20: _.fontSize(20),
  22: _.fontSize(22),
  24: _.fontSize(24),
  26: _.fontSize(26)
})
