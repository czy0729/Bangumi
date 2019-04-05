/*
 * @Author: czy0729
 * @Date: 2019-03-15 02:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-03 14:47:55
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { titleCase } from '@utils'
import _, {
  colorPlain,
  colorMain,
  colorPrimary,
  colorWarning,
  colorWait,
  colorDisabled,
  colorBorder,
  colorDesc,
  colorSub,
  radiusXs,
  shadow
} from '@styles'
import Touchable from './touchable'
import Activity from './activity'
import Text from './text'

const _Button = ({
  style,
  type,
  size,
  shadow,
  radius,
  loading,
  children,
  onPress,
  ...other
}) => {
  const _style = [styles.button]
  const textStyle = [styles.text]
  if (type) {
    _style.push(styles[type])
    textStyle.push(styles[`text${titleCase(type)}`])
  }
  if (size) {
    _style.push(styles[size])
    textStyle.push(styles[`text${titleCase(size)}`])
  }
  if (shadow) {
    _style.push(styles.shadow)
  }
  if (radius) {
    _style.push(styles.radius)
  }

  const content = (
    <>
      {loading && <Activity style={_.mr.xs} size='xs' />}
      <Text style={textStyle}>{children}</Text>
    </>
  )
  if (onPress) {
    const outerStyle = []
    if (radius) {
      outerStyle.push(styles.radius)
    }

    const whitelistStyle = {}
    if (style) {
      outerStyle.push(style)

      // 过滤掉margin之类的外围style
      Object.keys(style).forEach(key => {
        if (key.indexOf('margin') === -1) {
          whitelistStyle[key] = style[key]
        }
      })
    }

    return (
      <View style={outerStyle}>
        <Touchable onPress={onPress}>
          <View style={[_style, whitelistStyle]} {...other}>
            {content}
          </View>
        </Touchable>
      </View>
    )
  }

  return (
    <View style={[_style, style]} {...other}>
      {content}
    </View>
  )
}

_Button.defaultProps = {
  type: 'plain',
  size: 'md',
  shadow: false,
  radius: true,
  loading: false
}

export default _Button

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth
  },

  // type
  plain: {
    backgroundColor: colorPlain,
    borderColor: 'rgb(223, 223, 223)'
  },
  main: {
    backgroundColor: colorMain,
    borderColor: 'rgb(255, 54, 76)'
  },
  primary: {
    backgroundColor: colorPrimary,
    borderColor: 'rgb(13, 156, 204)'
  },
  warning: {
    backgroundColor: colorWarning,
    borderColor: 'rgb(249, 163, 80)'
  },
  wait: {
    backgroundColor: colorWait,
    borderColor: 'rgb(160, 160, 160)'
  },
  disabled: {
    backgroundColor: colorDisabled,
    borderColor: 'rgb(80, 80, 80)'
  },

  // ghost type
  ghostPlain: {
    backgroundColor: colorPlain,
    borderColor: colorBorder
  },
  ghostPrimary: {
    backgroundColor: 'rgb(248, 253, 255)',
    borderColor: 'rgb(159, 230, 254)'
  },
  ghostSuccess: {
    backgroundColor: 'rgb(236, 255, 236)',
    borderColor: 'rgb(115, 241, 115)'
  },

  // size
  sm: {
    width: 32,
    height: 32
  },
  md: {
    width: '100%',
    height: 40
  },

  // text
  text: {
    fontSize: 14
  },
  textSm: {
    fontSize: 11,
    fontWeight: 'bold'
  },
  textPlain: {
    color: colorDesc
  },
  textMain: {
    color: colorPlain
  },
  textPrimary: {
    color: colorPlain
  },
  textWarning: {
    color: colorPlain
  },
  textWait: {
    color: colorPlain
  },
  textDisabled: {
    color: colorPlain
  },
  textGhostPlain: {
    color: colorSub
  },
  textGhostPrimary: {
    color: colorSub
  },
  textGhostSuccess: {
    color: colorSub
  },

  // other
  shadow,
  radius: {
    borderRadius: radiusXs
  }
})
