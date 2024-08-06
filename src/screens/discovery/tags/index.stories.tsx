/*
 * @Author: czy0729
 * @Date: 2023-04-11 18:43:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:15:59
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Tags as Component } from '@screens'

export default {
  title: 'screens/Tags',
  component: Component
}

export const Tags = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Tags')} />
    </StorybookList>
  </StorybookSPA>
)
