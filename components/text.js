/*
 * 支持各种属性设置的文本
 * @Author: czy0729
 * @Date: 2019-03-15 06:11:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-31 23:23:22
 */
import React from 'react'
import { Text as RNText } from 'react-native'
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
    _style.push(_[`fontSize${size}`])
  }
  if (lineHeight !== undefined) {
    _style.push({
      lineHeight:
        lineHeight <= 2
          ? lineHeight * (size + _.fontSizeAdjust)
          : (lineHeight + _.fontSizeAdjust) * _.lineHeightRatio
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

const memoStyles = _.memoStyles(_ => ({
  text: IOS
    ? {
        fontWeight: 'normal'
      }
    : {},
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
}))
