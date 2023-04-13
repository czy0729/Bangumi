/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 19:27:42
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Blogs',
  component: Component
}

export const Blogs = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Blogs')} />
    </StorybookList>
  </StorybookSPA>
)
