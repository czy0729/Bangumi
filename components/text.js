/*
 * @Author: czy0729
 * @Date: 2019-03-15 06:11:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-02 20:45:31
 */
import React from 'react'
import { StyleSheet, Text as RNText } from 'react-native'
import {
  lineHeightRatio,
  colorMain,
  colorPrimary,
  colorSuccess,
  colorWarning,
  colorDanger,
  colorTitle,
  colorDesc,
  colorSub,
  colorBorder,
  fontSize
} from '@styles'

const Text = ({
  style,
  type,
  underline,
  size,
  lineHeight,
  align,
  bold,
  children,
  ...other
}) => {
  const _style = [styles.text]
  if (type) {
    _style.push(styles[type])
  }
  if (underline) {
    _style.push(styles.underline)
  }
  if (size) {
    _style.push(styles[size])
  }
  if (lineHeight !== undefined) {
    _style.push({
      lineHeight:
        lineHeight <= 2 ? lineHeight * size : lineHeight * lineHeightRatio
    })
  }
  if (align) {
    _style.push(align === 'right' ? styles.alignRight : styles.alignCenter)
  }
  if (bold) {
    _style.push(styles.bold)
  }
  if (style) {
    _style.push(style)
  }

  return (
    <RNText style={_style} allowFontScaling={false} {...other}>
      {children}
    </RNText>
  )
}

Text.defaultProps = {
  style: undefined,
  type: 'desc',
  underline: false,
  size: 14,
  lineHeight: undefined,
  align: undefined,
  bold: false,
  children: ''
}

export default Text

const styles = StyleSheet.create({
  text: {
    fontWeight: 'normal'
  },
  alignCenter: {
    textAlign: 'center'
  },
  alignRight: {
    textAlign: 'right'
  },
  bold: {
    fontWeight: 'bold'
  },
  10: fontSize(10),
  11: fontSize(11),
  12: fontSize(12),
  13: fontSize(13),
  14: fontSize(14),
  15: fontSize(15),
  16: fontSize(16),
  18: fontSize(18),
  20: fontSize(20),
  22: fontSize(22),
  24: fontSize(24),
  26: fontSize(26),
  plain: {
    color: 'rgba(255, 255, 255, 0.92)'
  },
  main: {
    color: colorMain
  },
  primary: {
    color: colorPrimary
  },
  success: {
    color: colorSuccess
  },
  warning: {
    color: colorWarning
  },
  danger: {
    color: colorDanger
  },
  title: {
    color: colorTitle
  },
  desc: {
    color: colorDesc
  },
  sub: {
    color: colorSub
  },
  border: {
    color: colorBorder
  },
  underline: {
    textDecorationLine: 'underline',
    textDecorationColor: colorMain
  }
})
