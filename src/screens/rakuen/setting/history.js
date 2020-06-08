/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:28:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-07 18:00:29
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

function History({ style, data, onDelete }) {
  const styles = memoStyles()
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
  border: {
    borderTopWidth: _.hairlineWidth,
    borderTopColor: _.colorBorder
  },
  close: {
    padding: _.sm
  }
}))
