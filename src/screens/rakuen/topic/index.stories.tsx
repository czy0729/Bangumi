/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:33:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:34:06
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Topic',
  component: Component
}

export const Topic = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Topic')} />
    </StorybookList>
  </StorybookSPA>
)
