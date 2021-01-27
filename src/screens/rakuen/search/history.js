/*
 * @Author: czy0729
 * @Date: 2019-05-17 00:06:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 09:39:22
 */
import React from 'react'
import { View } from 'react-native'
import { Touchable, Flex, Text, Iconfont, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function History({ style }, { $ }) {
  const { history, value } = $.state
  if (value !== '') {
    return null
  }

  const styles = memoStyles()
  return (
    <View style={style}>
      {history.map(item => (
        <View key={item} style={styles.item}>
          <Flex style={[styles.content, !_.flat && styles.border]}>
            <Flex.Item>
              <Text size={15} bold onPress={() => $.selectHistory(item)}>
                {item}
              </Text>
            </Flex.Item>
            <Touchable
              style={styles.close}
              onPress={() => $.deleteHistory(item)}
            >
              <Iconfont name='close' size={16} />
            </Touchable>
          </Flex>
        </View>
      ))}
      <Heatmap right={52} id='帖子搜索.选择历史' />
      <Heatmap id='帖子搜索.删除历史' transparent />
    </View>
  )
}

export default obc(History)

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingHorizontal: _.wind
  },
  content: {
    paddingVertical: _.sm
  },
  border: {
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: _.colorBorder
  },
  close: {
    padding: _.sm,
    marginLeft: _.md
  }
}))
