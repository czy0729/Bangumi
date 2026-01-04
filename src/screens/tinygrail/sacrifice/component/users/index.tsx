/*
 * @Author: czy0729
 * @Date: 2019-09-22 02:09:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-04 17:28:42
 */
import React from 'react'
import { View } from 'react-native'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Expand from './expand'
import Head from './head'
import List from './list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Users() {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <View style={styles.users}>
        <Head />
        <List />
        <Expand />
      </View>
    )
  })
}

export default Users
