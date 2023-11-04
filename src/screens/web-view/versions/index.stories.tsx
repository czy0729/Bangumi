/*
 * @Author: czy0729
 * @Date: 2023-11-04 05:49:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-04 06:21:17
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Versions',
  component: Component
}

export const Versions = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Versions')} />
    </StorybookList>
  </StorybookSPA>
)
