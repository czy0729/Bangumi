/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:54:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:20:26
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Tag as Component } from '@screens'

export default {
  title: 'screens/Tag',
  component: Component
}

export const Tag = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Tag')} />
    </StorybookList>
  </StorybookSPA>
)
