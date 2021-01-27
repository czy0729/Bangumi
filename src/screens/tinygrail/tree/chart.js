/*
 * @Author: czy0729
 * @Date: 2019-11-23 04:45:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:27:51
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_TINYGRAIL_CACULATE_TYPE } from '@constants/model'
import Item from './item'

function Chart({ data, caculateType, isTemple, onPress, onLongPress }) {
  const styles = memoStyles()
  const label = MODEL_TINYGRAIL_CACULATE_TYPE.getLabel(caculateType)
  let extra
  if (label === '股息') {
    extra = '+'
  }
  return (
    <View style={styles.container}>
      {data.map(item => (
        <Item
          key={item.id}
          {...item}
          label={label}
          extra={extra}
          isTemple={isTemple}
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
