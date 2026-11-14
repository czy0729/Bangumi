/*
 * @Author: czy0729
 * @Date: 2026-11-13 13:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 13:00:00
 *
 * 抽屉背景: iOS 毛玻璃, 其他端沿用纯色
 */
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView } from '@_'
import { _ } from '@stores'
import { IOS } from '@constants'
import { memoStyles } from './styles'

function Background() {
  if (!IOS) return null

  const styles = memoStyles()

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents='none'>
      <BlurView style={StyleSheet.absoluteFill} intensity={_.select(100, 72)} />
      <View style={[StyleSheet.absoluteFill, styles.tint]} />
    </View>
  )
}

export default observer(Background)
