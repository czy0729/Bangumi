/*
 * @Author: czy0729
 * @Date: 2022-04-27 06:26:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-27 07:09:23
 */
import React from 'react'
import { Touchable, Flex, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const COLOR_SUCCESS = 'rgb(1, 173, 145)'

function Btn({ style, text = '同步', type, disabled, onPress }) {
  const styles = memoStyles()
  return (
    <Touchable style={[styles.touch, style]} onPress={onPress}>
      <Flex
        style={[styles.btn, type === 'success' && !disabled && styles.btnSuccess]}
        justify='center'
      >
        <Text bold size={11}>
          {text}
        </Text>
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
  }
}))
