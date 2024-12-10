/*
 * @Author: czy0729
 * @Date: 2024-01-28 07:35:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 21:59:20
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Navigation } from '@types'
import { styles } from './styles'

function Dev({ navigation }: { navigation: Navigation }) {
  return (
    <Flex style={_.mt.lg} justify='center'>
      <Touchable
        onPress={() => {
          navigation.push('DEV')
        }}
      >
        <View style={styles.block} />
      </Touchable>
    </Flex>
  )
}

export default ob(Dev)
