/*
 * @Author: czy0729
 * @Date: 2023-08-01 19:19:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-20 00:00:00
 *
 * iOS 面板底色由自身提供, 毛玻璃只负责模糊, 不依赖背后画面的明暗
 */
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'
import { BlurView } from 'expo-blur'
import { _ } from '@stores'
import { IOS, WEB } from '@constants'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT } from '../../blur-view'
import { SafeAreaBottom } from '../../safe-area-bottom'
import { memoStyles } from './styles'

import type { Props } from './types'

function Container({ children }: Props) {
  const styles = memoStyles()

  if (IOS || WEB) {
    return (
      <View style={[styles.container, styles.base]}>
        <BlurView
          style={StyleSheet.absoluteFill}
          tint={_.select(BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK)}
          intensity={100}
          pointerEvents='none'
        />
        {children}
      </View>
    )
  }

  return (
    <SafeAreaBottom style={[styles.container, styles.plain]} type='paddingBottom'>
      {children}
    </SafeAreaBottom>
  )
}

export default observer(Container)
