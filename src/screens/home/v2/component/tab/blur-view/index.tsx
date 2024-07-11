/*
 * @Author: czy0729
 * @Date: 2024-07-10 16:31:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-10 16:32:19
 */
import React from 'react'
import { BlurViewBottomTab, BlurViewRoot } from '@_'
import { ob } from '@utils/decorators'
import { COMPONENT } from './ds'

function BlurView({ children }) {
  return (
    <BlurViewRoot>
      {children}
      <BlurViewBottomTab />
    </BlurViewRoot>
  )
}

export default ob(BlurView, COMPONENT)
