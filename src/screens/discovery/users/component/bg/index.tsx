/*
 * @Author: czy0729
 * @Date: 2026-01-02 03:09:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-02 04:51:06
 */
import React from 'react'
import { View } from 'react-native'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function DualOrbsStatic() {
  r(COMPONENT)

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <View style={styles.container}>
        <View style={styles.ballTL} />
        <View style={styles.ballBR} />
      </View>
    )
  })
}

export default DualOrbsStatic
