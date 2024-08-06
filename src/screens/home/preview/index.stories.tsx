/*
 * @Author: czy0729
 * @Date: 2023-04-12 01:08:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:20:01
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Preview as Component } from '@screens'

export default {
  title: 'screens/Preview',
  component: Component
}

export const Preview = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Preview')} />
    </StorybookList>
  </StorybookSPA>
)
