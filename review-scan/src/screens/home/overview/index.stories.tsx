/*
 * @Author: czy0729
 * @Date: 2024-10-09 02:01:27
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-10-09 02:01:27
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Overview as Component } from '@screens'

export default {
  title: 'screens/Overview',
  component: Component
}

export const Overview = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Overview')} />
    </StorybookList>
  </StorybookSPA>
)
