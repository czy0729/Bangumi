/*
 * 支持各种属性设置的文本
 * @Author: czy0729
 * @Date: 2019-03-15 06:11:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-11 22:49:33
 */
import React from 'react'
import { Text as RNText } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { s2t } from '@utils/thirdParty/cn-char'
import { PAD, IOS } from '@constants'
import { _, systemStore } from '@stores'

const padIncrease = PAD === 2 ? 4 : 2

function CompText(
  {
    style,
    type = 'desc',
    underline,
    size = 14,
    lineHeight,
    align,
    bold = false,
    selectable = false,
    shadow,
    children,
    ...other
  },
  { lineHeightIncrease = 0 }
) {
  const styles = memoStyles(_.mode)
  const _style = [styles.text]
  if (type) _style.push(styles[type])
  if (underline) _style.push(styles.underline)

  if (size) _style.push(_[`fontSize${size + (_.isPad ? padIncrease : 0)}`])
  const _lineHeightIncrease =
    (other.lineHeightIncrease === undefined
      ? lineHeightIncrease
      : other.lineHeightIncrease) + _.isPad
      ? padIncrease
      : 0

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
  if (bold) _style.push(styles.bold)
  if (shadow) _style.push(styles.shadow)
  if (style) _style.push(style)

  const { s2t: _s2t } = systemStore.setting
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
      {_s2t ? format(children) : children}
    </RNText>
  )
}

CompText.contextTypes = {
  lineHeightIncrease: PropTypes.number
}

export const Text = observer(CompText)

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
  shadow: {
    textShadowOffset: {
      width: 1,
      hegith: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.24)'
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

function format(children) {
  if (typeof children === 'string') {
    return s2t(children)
  }

  if (Array.isArray(children)) {
    return children.map(item => format(item))
  }

  return children
}
