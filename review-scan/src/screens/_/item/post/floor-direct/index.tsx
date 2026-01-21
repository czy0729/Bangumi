/*
 * @Author: czy0729
 * @Date: 2024-01-23 19:57:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-23 19:57:47
 */
import React from 'react'
import { View } from 'react-native'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'

function FloorDirect() {
  const styles = memoStyles()
  return <View style={styles.direct} pointerEvents='none' />
}

export default ob(FloorDirect)
