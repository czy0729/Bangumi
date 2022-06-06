/*
 * @Author: czy0729
 * @Date: 2022-01-19 10:21:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-19 10:22:28
 */
import React from 'react'
import { View } from 'react-native'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Split() {
  const styles = memoStyles()
  return <View style={styles.split} />
}

export default ob(Split)

const memoStyles = _.memoStyles(() => ({
  split: {
    marginTop: _.md,
    marginBottom: _.sm,
    borderTopWidth: 16,
    borderColor: _.colorBorder
  }
}))
