/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:29:08
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { User as Component } from '@screens'

export default {
  title: 'screens/User',
  component: Component
}

export const User = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('User')} />
    </StorybookList>
  </StorybookSPA>
)
