/*
 * @Author: czy0729
 * @Date: 2023-04-11 01:59:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:03:50
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
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
