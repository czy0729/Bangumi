/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:28:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-05 10:21:18
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'

function History({ style, data, onDelete }) {
  if (!data.length) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.item}>
          <Flex style={styles.content}>
            <Text size={15}>空</Text>
          </Flex>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, style]}>
      {data.map((item, index) => (
        <View key={item} style={[styles.item, index !== 0 && styles.border]}>
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
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  item: {
    paddingRight: _.wind
  },
  content: {
    paddingVertical: _.sm
  },
  border: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: _.colorBorder
  },
  close: {
    padding: _.sm
  }
})
