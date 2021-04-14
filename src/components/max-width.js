/*
 * @Author: czy0729
 * @Date: 2020-04-12 03:50:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-09 11:44:53
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

export const MaxWidth = observer(({ children }) => {
  if (!_.isPad) {
    return children
  }

  return <View style={styles.maxWidth}>{children}</View>
})

const styles = _.create({
  maxWidth: {
    width: _.window.width,
    paddingHorizontal: (_.window.width - _.window.maxWidth) / 2
  }
})
