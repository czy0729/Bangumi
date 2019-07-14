/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:28:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-14 15:22:42
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'

const History = ({ style, data, onDelete }) => {
  if (!data.length) {
    return (
      <View style={style}>
        <View style={styles.item}>
          <Flex style={styles.content}>
            <Text size={15}>空</Text>
          </Flex>
        </View>
      </View>
    )
  }

  return (
    <View style={style}>
      {data.map(item => (
        <View key={item} style={styles.item}>
          <Flex style={styles.content}>
            <Flex.Item>
              <Text size={15}>{item.replace('@undefined', '')}</Text>
            </Flex.Item>
            <Touchable
              style={[styles.close, _.ml.md]}
              onPress={() => onDelete(item)}
            >
              <Iconfont name='close' size={12} />
            </Touchable>
          </Flex>
        </View>
      ))}
    </View>
  )
}

History.defaultProps = {
  data: [],
  onDelete: Function.prototype
}

export default observer(History)

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: _.wind,
    backgroundColor: _.colorPlain
  },
  content: {
    paddingVertical: _.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: _.colorBorder
  },
  close: {
    padding: _.sm
  }
})
