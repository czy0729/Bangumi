/*
 * @Author: czy0729
 * @Date: 2024-10-11 04:08:46
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-10-11 04:08:46
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Milestone as Component } from '@screens'

export default {
  title: 'screens/Milestone',
  component: Component
}

export const Milestone = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Milestone')} />
    </StorybookList>
  </StorybookSPA>
)
