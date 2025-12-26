/*
 * @Author: czy0729
 * @Date: 2023-08-10 04:26:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-27 06:50:46
 */
import React from 'react'
import { View } from 'react-native'
import { HardwareTextureBlurView } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useInsets, useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { COMPONENT, H_TABBAR } from './ds'
import { memoStyles } from './styles'

/**
 * TabView 顶部的毛玻璃背景
 *  - iOS 因渲染原因, 会渲染一个等同于 Tabs 长度的毛玻璃做占位
 *  - 安卓是正常布局
 */
export function BlurViewTab({ length = 0 }) {
  r(COMPONENT)

  const { headerHeight, statusBarHeight } = useInsets()

  return useObserver(() => {
    const styles = memoStyles()
    const { androidBlur, blurBottomTabs } = systemStore.setting

    if (!IOS && !(androidBlur && blurBottomTabs)) {
      return (
        <View
          style={stl(
            styles.android,
            {
              height: headerHeight + H_TABBAR
            },
            styles.view,
            length <= 1 && {
              height: headerHeight + _.sm + _.ios(-statusBarHeight || 0, 0)
            }
          )}
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
                top: _.device(-statusBarHeight || 0, 0),
                left: -_.window.width * length,
                height: headerHeight + H_TABBAR + (statusBarHeight || 0)
              }
            ],
            [
              styles.android,
              {
                height: headerHeight + H_TABBAR
              }
            ]
          ),
          length <= 1 && {
            height: headerHeight + _.sm + _.ios(-statusBarHeight || 0, 0)
          }
        )}
      />
    )
  })
}

export default BlurViewTab
