/*
 * @Author: czy0729
 * @Date: 2019-03-15 02:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-25 05:52:56
 */
import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
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
import Activity from './activity'
import Text from './text'

const _Button = ({
  style,
  type = 'plain',
  size = 'md',
  shadow,
  radius = true,
  loading,
  children,
  renderContent,
  onPress,
  ...other
}) => {
  const _style = [styles.button]
  const textStyle = [styles['button-text']]

  if (type) {
    _style.push(styles[`button-${type}`])
    textStyle.push(styles[`button-text-${type}`])
  }

  if (size) {
    _style.push(styles[`button-${size}`])
    textStyle.push(styles[`button-text-${size}`])
  }

  if (shadow) {
    _style.push(styles['button-shadow'])
  }

  if (!radius) {
    _style.push(styles['button-no-radius'])
  }

  let content
  if (renderContent) {
    content = renderContent
  } else {
    content = <Text style={textStyle}>{children}</Text>
  }

  if (!onPress) {
    return (
      <View style={[_style, style]} {...other}>
        {loading && <Activity style={_.mr.xs} size='xs' />}
        {content}
      </View>
    )
  }

  return (
    <TouchableOpacity activeOpacity={0.56} onPress={onPress}>
      <View style={[_style, style]} {...other}>
        {loading && <Activity style={_.mr.xs} size='xs' />}
        {content}
      </View>
    </TouchableOpacity>
  )
}

export default _Button

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderStyle: 'solid',
    borderRadius: radiusXs
  },

  // type
  'button-plain': {
    backgroundColor: colorPlain,
    borderColor: 'rgb(223, 223, 223)'
  },
  'button-main': {
    backgroundColor: colorMain,
    borderColor: 'rgb(255, 54, 76)'
  },
  'button-primary': {
    backgroundColor: colorPrimary,
    borderColor: 'rgb(13, 156, 204)'
  },
  'button-warning': {
    backgroundColor: colorWarning,
    borderColor: 'rgb(249, 163, 80)'
  },
  'button-wait': {
    backgroundColor: colorWait,
    borderColor: 'rgb(160, 160, 160)'
  },
  'button-disabled': {
    backgroundColor: colorDisabled,
    borderColor: 'rgb(80, 80, 80)'
  },

  // ghost type
  'button-ghost-plain': {
    backgroundColor: colorPlain,
    borderColor: colorBorder,
    borderWidth: 1
  },
  'button-ghost-primary': {
    backgroundColor: 'rgb(248, 253, 255)',
    borderColor: 'rgb(159, 230, 254)',
    borderWidth: 1
  },
  'button-ghost-success': {
    backgroundColor: 'rgb(236, 255, 236)',
    borderColor: 'rgb(115, 241, 115)',
    borderWidth: 1
  },

  // size
  'button-sm': {
    width: 32,
    height: 32
  },
  'button-md': {
    width: '100%',
    height: 40
  },

  // other
  'button-shadow': {
    ...shadow
  },
  'button-no-radius': {
    borderRadius: 0
  },

  // button text
  'button-text': {
    fontSize: 14,
    fontWeight: 'bold'
  },
  'button-text-sm': {
    fontSize: 11
  },
  'button-text-plain': {
    color: colorDesc
  },
  'button-text-main': {
    color: colorPlain
  },
  'button-text-primary': {
    color: colorPlain
  },
  'button-text-warning': {
    color: colorPlain
  },
  'button-text-wait': {
    color: colorPlain
  },
  'button-text-disabled': {
    color: colorPlain
  },
  'button-text-ghost-plain': {
    color: colorSub
  },
  'button-text-ghost-primary': {
    color: colorSub
  },
  'button-text-ghost-success': {
    color: colorSub
  }
})
