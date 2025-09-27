/*
 * @Author: czy0729
 * @Date: 2022-05-06 17:51:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-06 17:53:46
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore } from '@stores'
import { Text } from '../text'
import { memoStyles } from './styles'

export const Control = observer(() => {
  const { enabled, grid, text, sum, mini } = systemStore.devEvent
  if (!enabled) return null

  const styles = memoStyles()
  return (
    <View style={styles.control} pointerEvents='none'>
      <Text
        style={styles.controlItem}
        type={grid ? 'warning' : '__plain__'}
        size={10}
        bold
        align='center'
        onPress={() => systemStore.toggleDevEvent('grid')}
      >
        Grid
      </Text>
      <Text
        style={styles.controlItem}
        type={text ? 'warning' : '__plain__'}
        size={10}
        bold
        align='right'
        onPress={() => systemStore.toggleDevEvent('text')}
      >
        Text
      </Text>
      <Text
        style={styles.controlItem}
        type={sum ? 'warning' : '__plain__'}
        size={10}
        bold
        align='right'
        onPress={() => systemStore.toggleDevEvent('sum')}
      >
        Sum
      </Text>
      <Text
        style={styles.controlItem}
        type={mini ? 'warning' : '__plain__'}
        size={10}
        bold
        align='right'
        onPress={() => systemStore.toggleDevEvent('mini')}
      >
        Mini
      </Text>
      <Text
        style={styles.controlItem}
        type={_.select('__plain__', 'warning')}
        size={10}
        bold
        align='center'
        onPress={() => _.toggleMode()}
      >
        Dark
      </Text>
      <Text
        style={styles.controlItem}
        type={systemStore.dev ? 'warning' : '__plain__'}
        size={10}
        bold
        align='center'
        onPress={systemStore.toggleDev}
      >
        Dev
      </Text>
    </View>
  )
})
