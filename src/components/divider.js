/*
 * 分割线
 * @Author: czy0729
 * @Date: 2019-03-29 03:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-27 11:52:25
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
      {/* <View style={styles.dot} /> */}
      {/* <View style={styles.dot} /> */}
    </Flex>
  )
})

const memoStyles = _.memoStyles(_ => ({
  divider: {
    width: '100%',
    paddingVertical: _.md
  },
  text: {
    marginHorizontal: _.wind
  },
  dot: {
    width: 6,
    height: 6,
    marginHorizontal: _.xs + 2,
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel2),
    borderRadius: 3,
    overflow: 'hidden'
  },
  line: {
    width: 64,
    borderWidth: 1,
    borderColor: _.colorBorder,
    borderRadius: 2,
    overflow: 'hidden'
  }
}))
