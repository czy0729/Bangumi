/*
 * @Author: czy0729
 * @Date: 2019-05-17 00:06:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-26 17:37:33
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'

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
    </View>
  )
}

History.contextTypes = {
  $: PropTypes.object
}

export default observer(History)

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
