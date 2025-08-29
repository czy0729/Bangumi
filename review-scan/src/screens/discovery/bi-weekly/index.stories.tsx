/*
 * @Author: czy0729
 * @Date: 2024-08-06 02:46:11
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-08-06 02:46:11
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { BiWeekly as Component } from '@screens'

export default {
  title: 'screens/BiWeekly',
  component: Component
}

export const BiWeekly = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('BiWeekly')} />
    </StorybookList>
  </StorybookSPA>
)
