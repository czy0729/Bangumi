/*
 * 分割线
 * @Author: czy0729
 * @Date: 2019-03-29 03:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-07 12:34:51
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import Flex from './flex'

function Divider({ style }) {
  const styles = memoStyles()
  return (
    <Flex style={[styles.divider, style]} justify='center'>
      <View style={styles.line} />
    </Flex>
  )
}

export default observer(Divider)

const memoStyles = _.memoStyles(_ => ({
  divider: {
    width: '100%',
    paddingVertical: _.md
  },
  text: {
    marginHorizontal: _.wind
  },
  line: {
    width: 96,
    borderWidth: _.hairlineWidth,
    borderColor: _.colorBorder
  }
}))
