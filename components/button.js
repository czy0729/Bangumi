/*
 * @Author: czy0729
 * @Date: 2019-03-15 02:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-14 13:59:58
 */
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { titleCase } from '@utils'
import _, {
  colorPlain,
  colorMain,
  colorPrimary,
  colorWarning,
  colorWait,
  colorBg,
  colorDisabled,
  colorBorder,
  colorDesc,
  colorSub,
  colorShadow,
  radiusXs
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
  const _wrap = [styles.button]
  const _text = [styles.text]
  if (type) {
    _wrap.push(styles[type])
    _text.push(styles[`text${titleCase(type)}`])
  }
  if (size) {
    _wrap.push(styles[size])
    _text.push(styles[`text${titleCase(size)}`])
  }
  if (shadow) {
    _wrap.push(styles.shadow)
  }
  if (radius) {
    _wrap.push(styles.radius)
  }
  if (style) {
    _wrap.push(style)
  }

  const content = (
    <>
      {loading && <Activity style={_.mr.xs} size='xs' />}
      <Text style={_text}>{children}</Text>
    </>
  )
  if (onPress) {
    return (
      <Touchable style={_wrap} onPress={onPress} {...other}>
        {content}
      </Touchable>
    )
  }

  return (
    <View style={_wrap} {...other}>
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
    backgroundColor: colorBg,
    borderColor: colorBorder
  },
  ghostMain: {
    backgroundColor: 'rgb(255, 243, 244)',
    borderColor: 'rgb(252, 128, 138)'
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
  textGhostMain: {
    color: colorSub
  },
  textGhostPrimary: {
    color: colorSub
  },
  textGhostSuccess: {
    color: colorSub
  },

  // other
  shadow: Platform.select({
    ios: {
      shadowColor: colorShadow,
      shadowOffset: { height: 3 },
      shadowOpacity: 0.16,
      shadowRadius: 3
    },
    android: {
      backgroundColor: colorPlain,
      elevation: 3
    }
  }),
  radius: {
    borderRadius: radiusXs
  }
})
