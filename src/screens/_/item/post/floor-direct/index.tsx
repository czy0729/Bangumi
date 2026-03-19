/*
 * @Author: czy0729
 * @Date: 2024-01-23 19:57:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:32:04
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { memoStyles } from './styles'

function FloorDirect() {
  const styles = memoStyles()

  return <View style={styles.direct} pointerEvents='none' />
}

export default observer(FloorDirect)
