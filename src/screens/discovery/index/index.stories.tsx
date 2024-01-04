/*
 * @Author: czy0729
 * @Date: 2023-04-11 01:59:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 16:11:39
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import Component from './index'

export default {
  title: 'screens/Discovery',
  component: Component
}

export const Discovery = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Discovery')} />
    </StorybookList>
  </StorybookSPA>
)
