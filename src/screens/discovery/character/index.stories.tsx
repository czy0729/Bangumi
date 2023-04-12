/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:02:19
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-04-12 10:02:19
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Character',
  component: Component
}

export const Character = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Character')} />
    </StorybookList>
  </StorybookSPA>
)
