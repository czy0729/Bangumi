/*
 * @Author: czy0729
 * @Date: 2019-05-17 00:06:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-30 14:06:59
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'

function History({ style }, { $ }) {
  const { history, value } = $.state
  if (value !== '') {
    return null
  }

  return (
    <View style={style}>
      {history.map(item => (
        <View key={item} style={styles.item}>
          <Flex style={styles.content}>
            <Flex.Item>
              <Text size={15} onPress={() => $.selectHistory(item)}>
                {item}
              </Text>
            </Flex.Item>
            <Touchable
              style={[styles.close, _.ml.md]}
              onPress={() => $.deleteHistory(item)}
            >
              <Iconfont name='close' size={12} />
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

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: _.wind
  },
  content: {
    paddingVertical: _.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: _.colorBorder
  },
  close: {
    padding: _.sm
  }
})
