/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:33:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:23:55
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Topic as Component } from '@screens'

export default {
  title: 'screens/Topic',
  component: Component
}

export const Topic = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Topic')} />
    </StorybookList>
  </StorybookSPA>
)
