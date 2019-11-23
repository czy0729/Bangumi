/*
 * @Author: czy0729
 * @Date: 2019-11-23 04:45:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-23 22:30:21
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from '@utils/decorators'
import { MODAL_TINYGRAIL_CACULATE_TYPE } from '@constants/model'
import { colorContainer } from '../styles'
import Item from './item'

function Chart({ data, caculateType, isTemple, onPress, onLongPress }) {
  const label = MODAL_TINYGRAIL_CACULATE_TYPE.getLabel(caculateType)
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
