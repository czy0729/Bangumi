/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:28:15
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Wenku',
  component: Component
}

export const Wenku = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Wenku')} />
    </StorybookList>
  </StorybookSPA>
)
