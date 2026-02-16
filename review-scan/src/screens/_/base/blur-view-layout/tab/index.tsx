/*
 * @Author: czy0729
 * @Date: 2023-08-10 04:26:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-01 23:37:33
 */
import React from 'react'
import { View } from 'react-native'
import { HardwareTextureBlurView } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

/**
 * TabView 顶部的毛玻璃背景
 *  - iOS 因渲染原因, 会渲染一个等同于 Tabs 长度的毛玻璃做占位
 *  - 安卓是正常布局
 */
export const BlurViewTab = ob(({ length = 0 }) => {
  const styles = memoStyles()
  const { androidBlur, blurBottomTabs } = systemStore.setting
  if (!IOS && !(androidBlur && blurBottomTabs)) {
    return (
      <View
        style={stl(styles.android, styles.view, length <= 1 && styles.noTab)}
        removeClippedSubviews
        pointerEvents='none'
      />
    )
  }

  return (
    <HardwareTextureBlurView
      style={stl(
        _.ios(
          [
            styles.ios,
            {
              left: -_.window.width * length
            }
          ],
          styles.android
        ),
        length <= 1 && styles.noTab
      )}
    />
  )
}, COMPONENT)

export default BlurViewTab
