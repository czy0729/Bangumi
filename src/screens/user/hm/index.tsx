/*
 * @Author: czy0729
 * @Date: 2022-08-06 12:05:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-06 12:08:55
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { useObserver } from '@utils/hooks'
import { ic } from '@utils/decorators'
import Store from './store'

const HM = () => {
  return useObserver(() => (
    <View>
      <Text>1</Text>
    </View>
  ))
}

export default ic(Store, HM)
