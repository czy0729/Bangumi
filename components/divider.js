/*
 * 分割线
 * @Author: czy0729
 * @Date: 2019-03-29 03:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-03 15:52:52
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import Flex from './flex'
import Text from './text'

function Divider({ style }) {
  const styles = memoStyles()
  return (
    <Flex style={[styles.divider, style]} justify='center'>
      <View style={styles.line} />
      <Text style={styles.text} type='border' size={20}>
        / / /
      </Text>
      <View style={styles.line} />
    </Flex>
  )
}

export default observer(Divider)

const memoStyles = _.memoStyles(_ => ({
  divider: {
    width: '100%',
    paddingVertical: 32
  },
  text: {
    marginHorizontal: _.wind
  },
  line: {
    width: 80,
    borderWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  }
}))
