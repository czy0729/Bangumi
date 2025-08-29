/*
 * @Author: czy0729
 * @Date: 2023-11-17 05:16:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-04 21:07:14
 */
import React from 'react'
import { View } from 'react-native'
import { Text, Touchable } from '@components'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import { styles } from './styles'

function Information() {
  return (
    <View style={styles.info}>
      <Touchable
        onPress={() => {
          if (WEB) {
            open('https://www.yuque.com/chenzhenyu-k0epm/znygb4/nogol0viqd1flhqt')
            return
          }

          open('https://www.yuque.com/chenzhenyu-k0epm/znygb4/rrb8zh')
        }}
      >
        <Text size={14} type='sub'>
          教程
        </Text>
      </Touchable>
    </View>
  )
}

export default ob(Information)
