/*
 * @Author: czy0729
 * @Date: 2022-05-01 11:46:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-04 17:48:47
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  /** base style */
  base: {
    includeFontPadding: false,
    textAlignVertical: _.web(undefined, 'center')
  },
  text: _.fontStyle,
  bold: _.fontBoldStyle,
  underline: {
    textDecorationLine: 'underline',
    textDecorationColor: _.web('rgba(254, 138, 149, 0.88)', _.select(_.colorMain, _.colorSub))
  },
  alignCenter: {
    textAlign: 'center'
  },
  alignRight: {
    textAlign: 'right'
  },
  shadow: {
    textShadowOffset: {
      width: 1,
      height: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.32)'
  },
  shrink: {
    flexShrink: 1
  },
  noWrap: {
    // @ts-ignore
    whiteSpace: 'nowrap'
  },

  /** theme color */
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

  /** font color */
  title: {
    color: _.colorTitle
  },
  desc: {
    color: _.colorDesc
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
  avatar: {
    color: _.colorAvatar
  },

  /** tinygrail theme color */
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
