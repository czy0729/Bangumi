/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:32:58
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/History',
  component: Component
}

export const History = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('History')} />
    </StorybookList>
  </StorybookSPA>
)
