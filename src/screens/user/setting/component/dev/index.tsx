/*
 * @Author: czy0729
 * @Date: 2024-01-28 07:35:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 17:24:24
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Touchable } from '@components'
import { _ } from '@stores'
import { styles } from './styles'

import type { WithNavigation } from '@types'

function Dev({ navigation }: WithNavigation) {
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
