/*
 * @Author: czy0729
 * @Date: 2023-08-10 04:26:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-22 21:06:40
 */
import React from 'react'
import { observer } from 'mobx-react'
import { HardwareTextureBlurView } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useInsets } from '@utils/hooks'
import { COMPONENT, H_TABBAR } from './ds'
import { memoStyles } from './styles'

/**
 * TabView 顶部的毛玻璃背景 (iOS)
 *  - 因渲染原因, 会渲染一个等同于 Tabs 长度的毛玻璃做占位
 */
export const BlurViewTab = observer(({ length = 0 }) => {
  r(COMPONENT)

  const { headerHeight, statusBarHeight } = useInsets()

  const styles = memoStyles()

  return (
    <HardwareTextureBlurView
      style={stl(
        styles.ios,
        {
          top: (-statusBarHeight || 0) + _.device(0, 24),
          left: -_.window.width * length,
          height: headerHeight + H_TABBAR + (statusBarHeight || 0)
        },
        length <= 1 && {
          height: headerHeight + _.sm + _.device(-statusBarHeight || 0, 0)
        }
      )}
    />
  )
})

export default BlurViewTab
