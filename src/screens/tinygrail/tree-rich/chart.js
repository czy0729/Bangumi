/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:28:43
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import Item from './item'

function Chart({ data, onPress, onLongPress }) {
  const styles = memoStyles()
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

export default ob(Chart, {
  data: [],
  onPress: Function.prototype
})

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))
