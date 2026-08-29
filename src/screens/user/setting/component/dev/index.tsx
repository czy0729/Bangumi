/*
 * @Author: czy0729
 * @Date: 2024-01-28 07:35:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-29 20:17:07
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Touchable } from '@components'
import { _ } from '@stores'
import { useNavigation } from '@utils/hooks'
import { styles } from './styles'

function Dev() {
  const navigation = useNavigation()

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

export default observer(Dev)
