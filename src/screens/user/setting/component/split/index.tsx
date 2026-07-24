/*
 * @Author: czy0729
 * @Date: 2022-01-19 10:21:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 18:28:20
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { memoStyles } from './styles'

function Split() {
  const styles = memoStyles()

  return <View style={styles.split} />
}

export default observer(Split)
