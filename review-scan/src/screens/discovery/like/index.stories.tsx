/*
 * @Author: czy0729
 * @Date: 2024-08-06 03:08:15
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-08-06 03:08:15
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Like as Component } from '@screens'

export default {
  title: 'screens/Like',
  component: Component
}

export const Like = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Like')} />
    </StorybookList>
  </StorybookSPA>
)
