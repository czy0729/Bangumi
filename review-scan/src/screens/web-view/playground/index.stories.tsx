/*
 * @Author: czy0729
 * @Date: 2023-11-15 02:47:18
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-11-15 02:47:18
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Playground',
  component: Component
}

export const Playground = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Playground')} />
    </StorybookList>
  </StorybookSPA>
)
