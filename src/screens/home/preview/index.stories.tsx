/*
 * @Author: czy0729
 * @Date: 2023-04-12 01:08:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 01:08:59
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Preview',
  component: Component
}

export const Preview = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Preview')} />
    </StorybookList>
  </StorybookSPA>
)
