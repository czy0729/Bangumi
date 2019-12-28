/*
 * @Author: czy0729
 * @Date: 2019-08-13 19:46:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-08 02:09:29
 */
import React from 'react'
import { StyleSheet, Text } from 'react-native'
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

function BgmText({ style, index, size, lineHeight, children, ...other }) {
  const _style = [styles.text]
  if (size) {
    _style.push(styles[size])
  }
  if (lineHeight !== undefined) {
    _style.push({
      lineHeight:
        lineHeight <= 2 ? lineHeight * size : lineHeight * _.lineHeightRatio
    })
  }
  if (style) {
    _style.push(style)
  }

  return (
    <Text style={_style} allowFontScaling={false} selectable {...other}>
      {children || bgmMap[index - 1]}
    </Text>
  )
}

BgmText.defaultProps = {
  style: undefined,
  index: 0,
  size: 14,
  lineHeight: undefined
}

export default BgmText

const styles = StyleSheet.create({
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
