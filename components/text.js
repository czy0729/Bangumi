/*
 * 支持各种属性设置的文本
 * @Author: czy0729
 * @Date: 2019-03-15 06:11:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-30 12:05:30
 */
import React from 'react'
import { StyleSheet, Text as RNText } from 'react-native'
import { observer } from 'mobx-react'
import { IOS } from '@constants'
import { _ } from '@stores'

function Text({
  style,
  type,
  underline,
  size,
  lineHeight,
  align,
  bold,
  children,
  ...other
}) {
  const styles = memoStyles(_.mode)
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
        lineHeight <= 2 ? lineHeight * size : lineHeight * _.lineHeightRatio
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
    <RNText style={_style} allowFontScaling={false} selectable {...other}>
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

export default observer(Text)

let _mode
let _styles
function memoStyles(mode) {
  if (!_mode || !_styles || _mode !== mode) {
    _mode = mode
    _styles = StyleSheet.create({
      text: IOS
        ? {
            fontWeight: 'normal'
          }
        : {},
      8: _.fontSize(8),
      9: _.fontSize(9),
      10: _.fontSize(10),
      11: _.fontSize(11),
      12: _.fontSize(12),
      13: _.fontSize(13),
      14: _.fontSize(14),
      15: _.fontSize(15),
      16: _.fontSize(16),
      17: _.fontSize(17),
      18: _.fontSize(18),
      19: _.fontSize(19),
      20: _.fontSize(20),
      21: _.fontSize(21),
      22: _.fontSize(22),
      23: _.fontSize(23),
      24: _.fontSize(24),
      26: _.fontSize(26),
      28: _.fontSize(28),
      plain: {
        color: _.colorPlain
      },
      main: {
        color: _.colorMain
      },
      primary: {
        color: _.colorPrimary
      },
      success: {
        color: _.colorSuccess
      },
      warning: {
        color: _.colorWarning
      },
      danger: {
        color: _.colorDanger
      },
      title: {
        color: _.colorTitle
      },
      desc: {
        color: _.colorDesc
      },
      avatar: {
        color: _.colorAvatar
      },
      sub: {
        color: _.colorSub
      },
      icon: {
        color: _.colorIcon
      },
      border: {
        color: _.colorBorder
      },
      underline: {
        textDecorationLine: 'underline',
        textDecorationColor: _.colorMain
      },
      alignCenter: {
        textAlign: 'center'
      },
      alignRight: {
        textAlign: 'right'
      },
      bold: IOS
        ? {
            fontWeight: 'bold'
          }
        : {}
    })
  }
  return _styles
}
