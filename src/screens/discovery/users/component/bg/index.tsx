/*
 * @Author: czy0729
 * @Date: 2026-01-02 03:09:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-09 12:44:17
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function DualOrbsStatic() {
  r(COMPONENT)

  const styles = memoStyles()

  return (
    <View style={styles.container}>
      <View style={styles.ballTL} />
      <View style={styles.ballBR} />
    </View>
  )
}

export default observer(DualOrbsStatic)
