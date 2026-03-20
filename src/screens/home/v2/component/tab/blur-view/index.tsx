/*
 * @Author: czy0729
 * @Date: 2024-07-10 16:31:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 07:40:30
 */
import React from 'react'
import { observer } from 'mobx-react'
import { BlurViewBottomTab, BlurViewRoot } from '@_'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { PropsWithChildren } from 'react'

function BlurView({ children }: PropsWithChildren) {
  r(COMPONENT)

  return (
    <BlurViewRoot>
      {children}
      <BlurViewBottomTab />
    </BlurViewRoot>
  )
}

export default observer(BlurView)
