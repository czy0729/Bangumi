/*
 * @Author: czy0729
 * @Date: 2024-01-23 19:57:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-13 20:49:05
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from '@utils/hooks'
import { memoStyles } from './styles'

function FloorDirect() {
  return useObserver(() => {
    const styles = memoStyles()

    return <View style={styles.direct} pointerEvents='none' />
  })
}

export default FloorDirect
