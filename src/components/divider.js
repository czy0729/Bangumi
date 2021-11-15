/*
 * 分割线
 * @Author: czy0729
 * @Date: 2019-03-29 03:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-15 20:39:07
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { Flex } from './flex'

export const Divider = observer(({ style }) => {
  const styles = memoStyles()
  return (
    <Flex style={style ? [styles.divider, style] : styles.divider} justify='center'>
      <View style={styles.line} />
    </Flex>
  )
})

const memoStyles = _.memoStyles(_ => ({
  divider: {
    width: '100%',
    paddingTop: _.md,
    paddingBottom: _.sm
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
