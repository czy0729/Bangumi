/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:25:15
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Actions as Component } from '@screens'

export default {
  title: 'screens/Actions',
  component: Component
}

export const Actions = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Actions')} />
    </StorybookList>
  </StorybookSPA>
)
