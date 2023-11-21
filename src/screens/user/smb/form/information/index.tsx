/*
 * @Author: czy0729
 * @Date: 2023-11-17 05:16:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-17 05:23:20
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Text } from '@components'
import { ob } from '@utils/decorators'
import { styles } from './styles'

function Information() {
  return (
    <View style={styles.info}>
      <Touchable
        onPress={() => open('https://www.yuque.com/chenzhenyu-k0epm/znygb4/rrb8zh')}
      >
        <Text size={14} type='sub'>
          教程
        </Text>
      </Touchable>
    </View>
  )
}

export default ob(Information)
