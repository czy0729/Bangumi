/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:22:13
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Blog as Component } from '@screens'

export default {
  title: 'screens/Blog',
  component: Component
}

export const Blog = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Blog')} />
    </StorybookList>
  </StorybookSPA>
)
