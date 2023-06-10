/*
 * @Author: czy0729
 * @Date: 2023-06-10 14:08:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-10 14:27:49
 */
import React from 'react'
import { View } from 'react-native'
import { Text } from '@components'
import { ob } from '@utils/decorators'
import { styles } from './styles'
import { Props as RateProps } from './types'
import { IOS } from '@constants'

export { RateProps }

export const Rate = ob(({ value = '' }: RateProps) => {
  return (
    <View style={styles.rate} pointerEvents='none'>
      <Text overrideStyle={styles.rateText}>
        {value}
        {IOS ? '' : '　'}
      </Text>
    </View>
  )
})
