/*
 * @Author: czy0729
 * @Date: 2022-04-26 17:33:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 09:27:16
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

const COLOR_SUCCESS = 'rgb(1, 173, 145)'
const hitSlop = {
  top: 4,
  right: 32,
  bottom: 4,
  left: 16
}

function ColumnSelect({ select, disabled, onPress }) {
  if (disabled) {
    return (
      <View style={styles.columnSelect}>
        {/* <Flex style={styles.radio} justify='center'>
          <Iconfont name='md-do-not-disturb-alt' size={16} />
        </Flex> */}
      </View>
    )
  }

  return (
    <Touchable
      style={styles.columnSelect}
      hitSlop={hitSlop}
      onPress={() => onPress(!select)}
    >
      <Flex style={styles.radio} justify='center'>
        <Iconfont
          name={select ? 'md-check-circle' : 'md-radio-button-off'}
          color={select ? COLOR_SUCCESS : undefined}
          size={16}
        />
      </Flex>
    </Touchable>
  )
}

export default ob(ColumnSelect)

const styles = _.create({
  columnSelect: {
    width: 26,
    height: 28,
    paddingTop: 5,
    marginTop: 3,
    marginLeft: -2,
    borderRadius: 20,
    overflow: 'hidden'
  },
  radio: {
    width: 26,
    height: 26
  }
})
