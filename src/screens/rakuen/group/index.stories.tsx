/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:22:29
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Group as Component } from '@screens'

export default {
  title: 'screens/Group',
  component: Component
}

export const Group = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Group')} />
    </StorybookList>
  </StorybookSPA>
)
