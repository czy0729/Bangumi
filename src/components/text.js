/*
 * 支持各种属性设置的文本
 * @Author: czy0729
 * @Date: 2019-03-15 06:11:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-15 15:20:06
 */
import React from 'react'
import { Text as RNText, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { IOS } from '@constants'
import { _ } from '@stores'

/**
 * 某些安卓手机, 例如oppo、一加, 没有默认系统字体, 有时候显示数字会被截断
 * 需要手动包裹一层默认字体
 * https://github.com/facebook/react-native/issues/15114
 */
function StandardText({ children, ...other }) {
  return (
    <Text style={!IOS && styles.standardText} {...other}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  standardText: {
    fontFamily: 'Roboto'
  }
})

function Text(
  {
    style,
    type,
    underline,
    size,
    lineHeight,
    align,
    bold,
    selectable,
    children,
    ...other
  },
  { lineHeightIncrease = 0 }
) {
  const styles = memoStyles(_.mode)
  const _style = [styles.text]
  if (type) {
    _style.push(styles[type])
  }
  if (underline) {
    _style.push(styles.underline)
  }
  if (size) {
    _style.push(_[`fontSize${size}`])
  }

  const _lineHeightIncrease =
    other.lineHeightIncrease === undefined
      ? lineHeightIncrease
      : other.lineHeightIncrease
  if (lineHeight !== undefined || _lineHeightIncrease) {
    const _lineHeight = Math.max(lineHeight || 14, size) + _lineHeightIncrease
    _style.push({
      lineHeight:
        _lineHeight <= 2 + _lineHeightIncrease
          ? _lineHeight * (size + _.fontSizeAdjust)
          : (_lineHeight + _.fontSizeAdjust) * _.lineHeightRatio
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
    <RNText
      style={_style}
      allowFontScaling={false}
      selectable={selectable}
      numberOfLines={0}
      {...other}
      textBreakStrategy='simple'
      android_hyphenationFrequency='none'
    >
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
  selectable: false,
  children: ''
}

Text.contextTypes = {
  lineHeightIncrease: PropTypes.number
}

Text.StandardText = StandardText

export default observer(Text)

const memoStyles = _.memoStyles(_ => ({
  text: IOS
    ? {
        fontWeight: 'normal'
      }
    : {
        fontFamily: ''
      },
  underline: {
    textDecorationLine: 'underline',
    textDecorationColor: _.select(_.colorMain, _.colorSub)
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

  // theme
  plain: {
    color: _.colorPlain
  },
  __plain__: {
    color: _.__colorPlain__
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

  // tinygrail theme
  bid: {
    color: _.colorBid
  },
  ask: {
    color: _.colorAsk
  },
  tinygrailPlain: {
    color: _.colorTinygrailPlain
  },
  tinygrailText: {
    color: _.colorTinygrailText
  },
  tinygrailIcon: {
    color: _.colorTinygrailIcon
  }
}))
