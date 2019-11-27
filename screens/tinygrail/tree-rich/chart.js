/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-27 22:50:23
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from '@utils/decorators'
import { colorContainer } from '../styles'
import Item from './item'

function Chart({ data, onPress, onLongPress }) {
  return (
    <View style={styles.container}>
      {data.map(item => (
        <Item
          key={item.id}
          {...item}
          onPress={onPress}
          onLongPress={onLongPress}
        />
      ))}
    </View>
  )
}

Chart.defaultProps = {
  data: [],
  onPress: Function.prototype
}

export default observer(Chart)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorContainer
  }
})
