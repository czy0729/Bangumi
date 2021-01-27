/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:28:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 09:43:05
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function History({ style, data, onDelete }) {
  const styles = memoStyles()
  if (!data.length) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.item}>
          <Flex style={styles.content}>
            <Text type='title' size={15} bold>
              空
            </Text>
          </Flex>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.container, style]}>
      {data.map(item => (
        <View key={item} style={styles.item}>
          <Flex style={styles.content}>
            <Flex.Item>
              <Text type='title' size={15} bold>
                {item.replace('@undefined', '')}
              </Text>
            </Flex.Item>
            <Touchable
              style={[styles.close, _.ml.md]}
              onPress={() => onDelete(item)}
            >
              <Iconfont name='close' />
            </Touchable>
          </Flex>
        </View>
      ))}
    </View>
  )
}

export default ob(History, {
  data: [],
  onDelete: Function.prototype
})

const memoStyles = _.memoStyles(_ => ({
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
  close: {
    padding: _.sm
  }
}))
