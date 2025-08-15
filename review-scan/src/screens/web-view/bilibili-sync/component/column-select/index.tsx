/*
 * @Author: czy0729
 * @Date: 2022-04-26 17:33:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-14 16:41:44
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Touchable } from '@components'
import { ob } from '@utils/decorators'
import { COLOR_SUCCESS, COMPONENT, HIT_SLOP } from './ds'
import { styles } from './styles'

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
    <Touchable style={styles.columnSelect} hitSlop={HIT_SLOP} onPress={() => onPress(!select)}>
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

export default ob(ColumnSelect, COMPONENT)
