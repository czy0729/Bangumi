/*
 * @Author: czy0729
 * @Date: 2023-08-01 19:19:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-08-10 20:22:05
 */
import React from 'react'
import { observer } from 'mobx-react'
import { BlurView } from 'expo-blur'
import { _ } from '@stores'
import { IOS, STORYBOOK } from '@constants'
import { SafeAreaBottom } from '../../safe-area-bottom'
import { memoStyles } from './styles'

function Container({ children }) {
  const styles = memoStyles()
  if (IOS || STORYBOOK) {
    return (
      <BlurView
        style={styles.container}
        tint={_.select('light', 'dark')}
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
