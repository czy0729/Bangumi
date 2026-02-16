/*
 * @Author: czy0729
 * @Date: 2023-04-11 18:56:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:15:50
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Staff as Component } from '@screens'

export default {
  title: 'screens/Staff',
  component: Component
}

export const Staff = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Staff')} />
    </StorybookList>
  </StorybookSPA>
)
