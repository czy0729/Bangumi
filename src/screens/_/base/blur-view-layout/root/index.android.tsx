/*
 * @Author: czy0729
 * @Date: 2023-08-10 04:16:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-22 21:36:38
 */
import React from 'react'
import { observer } from 'mobx-react'
import { HardwareTextureRootBlurView } from '@components'
import { _, systemStore } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Props } from './types'

/**
 * iOS 是不需要这套逻辑的, 会直接渲染成 View
 *
 * 安卓端会把子层级下的所有 BlurView 渲染到根本的 RootContainer
 * 始终渲染 BlurRootView 以保持 blur node 引用有效, 避免切换设置时毛玻璃失效
 */
export const BlurViewRoot = observer(({ children }: Props) => {
  r(COMPONENT)

  if (systemStore.blurTopTabs || systemStore.blurBottomTabs) {
    return (
      <HardwareTextureRootBlurView style={_.container.plain}>
        {children}
      </HardwareTextureRootBlurView>
    )
  }

  return <>{children}</>
})

export default BlurViewRoot
