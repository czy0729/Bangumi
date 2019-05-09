/*
 * @Author: czy0729
 * @Date: 2019-03-15 02:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-09 16:40:08
 */
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import { ActivityIndicator } from '@ant-design/react-native'
import { titleCase } from '@utils'
import _ from '@styles'
import Touchable from './touchable'
import Flex from './flex'
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

  // 安卓的阴影要保证有背景颜色才能显示, 所以为了不覆盖type的bg, 放在type前面
  if (shadow) {
    _wrap.push(styles.shadow)
  }
  if (type) {
    _wrap.push(styles[type])
    _text.push(styles[`text${titleCase(type)}`])
  }
  if (size) {
    _wrap.push(styles[size])
    _text.push(styles[`text${titleCase(size)}`])
  }
  if (radius) {
    _wrap.push(styles.radius)
  }
  if (style) {
    _wrap.push(style)
  }

  const content = (
    <Flex justify='center'>
      {loading && (
        <View style={_.mr.xs}>
          <ActivityIndicator color='white' size='small' />
        </View>
      )}
      <Text style={_text}>{children}</Text>
    </Flex>
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
    backgroundColor: _.colorPlain,
    borderColor: 'rgb(223, 223, 223)'
  },
  main: {
    backgroundColor: _.colorMain,
    borderColor: 'rgb(255, 54, 76)'
  },
  primary: {
    backgroundColor: _.colorPrimary,
    borderColor: 'rgb(13, 156, 204)'
  },
  warning: {
    backgroundColor: _.colorWarning,
    borderColor: 'rgb(249, 163, 80)'
  },
  wait: {
    backgroundColor: _.colorWait,
    borderColor: 'rgb(160, 160, 160)'
  },
  disabled: {
    backgroundColor: _.colorDisabled,
    borderColor: 'rgb(80, 80, 80)'
  },

  // ghost type
  ghostPlain: {
    backgroundColor: _.colorBg,
    borderColor: _.colorBorder
  },
  ghostMain: {
    backgroundColor: 'rgba(255, 243, 244, 0.8)',
    borderColor: 'rgb(252, 128, 138)'
  },
  ghostPrimary: {
    backgroundColor: 'rgba(248, 253, 255, 0.8)',
    borderColor: _.colorPrimaryBorder
  },
  ghostSuccess: {
    backgroundColor: 'rgba(236, 255, 236, 0.8)',
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
    color: _.colorDesc
  },
  textMain: {
    color: _.colorPlain
  },
  textPrimary: {
    color: _.colorPlain
  },
  textWarning: {
    color: _.colorPlain
  },
  textWait: {
    color: _.colorPlain
  },
  textDisabled: {
    color: _.colorPlain
  },
  textGhostPlain: {
    color: _.colorSub
  },
  textGhostMain: {
    color: _.colorSub
  },
  textGhostPrimary: {
    color: _.colorSub
  },
  textGhostSuccess: {
    color: _.colorSub
  },

  // other
  shadow: Platform.select({
    ios: {
      shadowColor: _.colorShadow,
      shadowOffset: { height: 3 },
      shadowOpacity: 0.16,
      shadowRadius: 3
    },
    android: {
      backgroundColor: _.colorPlain,
      elevation: 3
    }
  }),
  radius: {
    borderRadius: _.radiusXs
  }
})
