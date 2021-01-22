/*
 * @Author: czy0729
 * @Date: 2021-01-22 11:53:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-22 11:57:02
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

function Page({ children }) {
  if (!_.isDark) {
    return children
  }

  return <View style={styles.page}>{children}</View>
}

export default observer(Page)

const styles = _.create({
  page: {
    flex: 1,
    backgroundColor: _._colorPlain
  }
})
