/*
 * @Author: czy0729
 * @Date: 2023-08-10 04:26:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-22 21:36:49
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { HardwareTextureBlurView } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useInsets } from '@utils/hooks'
import { COMPONENT, H_TABBAR } from './ds'
import { memoStyles } from './styles'

/**
 * TabView 顶部的毛玻璃背景 (Android)
 */
export const BlurViewTab = observer(({ length = 0 }) => {
  r(COMPONENT)

  const { headerHeight } = useInsets()

  const styles = memoStyles()

  // 未开启毛玻璃时渲染纯色背景
  if (!systemStore.blurTopTabs) {
    return (
      <View
        style={stl(
          styles.android,
          {
            height: headerHeight + H_TABBAR
          },
          styles.view,
          length <= 1 && {
            height: headerHeight + _.sm
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
        styles.android,
        {
          height: headerHeight + H_TABBAR
        },
        length <= 1 && {
          height: headerHeight + _.sm
        }
      )}
    />
  )
})

export default BlurViewTab
