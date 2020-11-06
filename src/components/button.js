/*
 * 自定义按钮
 * @Author: czy0729
 * @Date: 2019-03-15 02:32:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-05 20:17:00
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { titleCase } from '@utils'
import { _ } from '@stores'
import Activity from './activity'
import Flex from './flex'
import Text from './text'
import Touchable from './touchable'

function Button({
  style,
  styleText,
  type,
  size,
  shadow,
  radius,
  loading,
  children,
  onPress,
  ...other
}) {
  const styles = memoStyles(_.mode)
  const _wrap = [styles.button]
  const _text = [styles.text]
  if (shadow && !_.isDark) {
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
        <View style={_.scale}>
          <Activity
            color={type === 'plain' ? 'rgb(128, 128, 128)' : 'white'}
            size='small'
          />
        </View>
      )}
      <Text
        style={[
          // 部分安卓机不写具体width会导致文字显示不全
          size === 'sm' && {
            width: 32
          },
          _text,
          styleText
        ]}
        align='center'
        selectable={false}
      >
        {children}
      </Text>
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

Button.defaultProps = {
  style: undefined,
  styleText: undefined,
  type: 'plain',
  size: 'md',
  shadow: false,
  radius: true,
  loading: false
}

export default observer(Button)

const memoStyles = _.memoStyles(_ => ({
  button: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0
  },

  // type
  plain: {
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1)
  },
  main: {
    backgroundColor: _.colorMain
  },
  primary: {
    backgroundColor: _.colorPrimary
  },
  warning: {
    backgroundColor: _.colorWarning
  },
  wait: {
    backgroundColor: _.colorWait
  },
  disabled: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2),
    opacity: 0.4
  },
  bid: {
    backgroundColor: _.colorBid
  },
  ask: {
    backgroundColor: _.colorAsk
  },

  // ghost type
  ghostMain: {
    backgroundColor: _.select(_.colorMainLight, _._colorDarkModeLevel2),
    borderColor: _.select(_.colorMainBorder, _._colorDarkModeLevel2),
    borderWidth: _.select(_.hairlineWidth, 0)
  },
  ghostPrimary: {
    backgroundColor: _.select(_.colorPrimaryLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorPrimaryBorder, _._colorDarkModeLevel1),
    borderWidth: _.select(_.hairlineWidth, 0)
  },
  ghostSuccess: {
    backgroundColor: _.select(_.colorSuccessLight, _._colorDarkModeLevel1),
    borderColor: _.select(_.colorSuccessBorder, _._colorDarkModeLevel1),
    borderWidth: _.select(_.hairlineWidth, 0)
  },
  ghostPlain: {
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel2)
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
    fontSize: 14 + _.fontSizeAdjust
  },
  textSm: {
    fontSize: 11 + _.fontSizeAdjust,
    fontWeight: 'bold'
  },
  textPlain: {
    color: _.colorDesc
  },
  textMain: {
    color: _.__colorPlain__
  },
  textPrimary: {
    color: _.__colorPlain__
  },
  textWarning: {
    color: _.__colorPlain__
  },
  textWait: {
    color: _.__colorPlain__
  },
  textDisabled: {
    color: _.colorSub
  },
  textBid: {
    color: _.__colorPlain__
  },
  textAsk: {
    color: _.__colorPlain__
  },
  textGhostPlain: {
    color: _.colorSub
  },
  textGhostMain: {
    color: _.select(_.colorSub, _.colorMain)
  },
  textGhostPrimary: {
    color: _.colorSub
  },
  textGhostSuccess: {
    color: _.select(_.colorSub, _.colorSuccess)
  },

  // other
  shadow: {
    shadowColor: _.colorShadow,
    shadowOffset: {
      height: 3
    },
    shadowOpacity: 0.16,
    shadowRadius: 3,
    elevation: 8
  },
  radius: {
    borderRadius: _.radiusXs
  }
}))
