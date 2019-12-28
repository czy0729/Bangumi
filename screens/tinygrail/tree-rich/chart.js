/*
 * @Author: czy0729
 * @Date: 2019-11-27 21:50:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-09 22:06:51
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
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

Chart.defaultProps = {
  data: [],
  onPress: Function.prototype
}

export default observer(Chart)

const memoStyles = _.memoStyles(_ => ({
  container: {
    flex: 1,
    backgroundColor: _.colorTinygrailContainer
  }
}))
