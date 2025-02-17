/*
 * @Author: czy0729
 * @Date: 2023-08-01 19:19:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:51:41
 */
import React from 'react'
import { observer } from 'mobx-react'
import { BlurView } from 'expo-blur'
import { _ } from '@stores'
import { IOS, WEB } from '@constants'
import { BLURVIEW_TINT_DARK, BLURVIEW_TINT_LIGHT } from '../../blur-view'
import { SafeAreaBottom } from '../../safe-area-bottom'
import { memoStyles } from './styles'

function Container({ children }) {
  const styles = memoStyles()
  if (IOS || WEB) {
    return (
      <BlurView
        style={styles.container}
        tint={_.select(BLURVIEW_TINT_LIGHT, BLURVIEW_TINT_DARK)}
        intensity={100}
      >
        {children}
      </BlurView>
    )
  }

  return (
    <SafeAreaBottom style={[styles.container, styles.plain]} type='paddingBottom'>
      {children}
    </SafeAreaBottom>
  )
}

export default observer(Container)
