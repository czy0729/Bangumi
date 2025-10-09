/*
 * @Author: czy0729
 * @Date: 2024-07-10 16:31:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-09 05:54:04
 */
import React, { PropsWithChildren } from 'react'
import { BlurViewBottomTab, BlurViewRoot } from '@_'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'

function BlurView({ children }: PropsWithChildren) {
  r(COMPONENT)

  return useObserver(() => (
    <BlurViewRoot>
      {children}
      <BlurViewBottomTab />
    </BlurViewRoot>
  ))
}

export default BlurView
