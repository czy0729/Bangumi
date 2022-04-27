/*
 * @Author: czy0729
 * @Date: 2022-04-27 06:26:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-27 19:05:35
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Loading } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const COLOR_SUCCESS = 'rgb(1, 173, 145)'

function Btn({
  style,
  btnStyle,
  text = '同步',
  type,
  size = 11,
  disabled,
  loading,
  onPress
}) {
  const styles = memoStyles()
  const isSuccess = type === 'success' && !disabled
  return (
    <Touchable
      style={[styles.touch, style]}
      onPress={disabled || loading ? undefined : onPress}
    >
      <Flex
        style={[styles.btn, isSuccess && styles.btnSuccess, btnStyle]}
        justify='center'
      >
        {loading ? (
          <View style={styles.loading}>
            <Loading.Raw />
          </View>
        ) : (
          <Text bold size={size} type={isSuccess ? '__plain__' : undefined}>
            {text}
          </Text>
        )}
      </Flex>
    </Touchable>
  )
}

export default ob(Btn)

const memoStyles = _.memoStyles(() => ({
  touch: {
    width: 64,
    borderRadius: _.r(28),
    overflow: 'hidden'
  },
  btn: {
    height: _.r(28),
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.r(28)
  },
  btnSuccess: {
    backgroundColor: COLOR_SUCCESS
  },
  loading: {
    transform: [
      {
        scale: 0.64
      }
    ]
  }
}))
