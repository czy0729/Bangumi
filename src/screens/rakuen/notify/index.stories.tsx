/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:33:14
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Notify',
  component: Component
}

export const Notify = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Notify')} />
    </StorybookList>
  </StorybookSPA>
)
