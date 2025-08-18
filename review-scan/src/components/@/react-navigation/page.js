/*
 * @Author: czy0729
 * @Date: 2021-01-22 11:53:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-24 20:48:17
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

function Page({ children }) {
  return <View style={_.isDark ? styles.dark : styles.light}>{children}</View>
}

export default observer(Page)

const styles = _.create({
  light: {
    flex: 1
  },
  dark: {
    flex: 1,
    backgroundColor: _._colorPlain
  }
})
