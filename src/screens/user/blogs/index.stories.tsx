/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:38:13
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/UserBlogs',
  component: Component
}

export const UserBlogs = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('UserBlogs')} />
    </StorybookList>
  </StorybookSPA>
)
