/*
 * @Author: czy0729
 * @Date: 2023-04-11 18:43:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:28:03
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

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
