/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:33:06
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Mine',
  component: Component
}

export const Mine = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Mine')} />
    </StorybookList>
  </StorybookSPA>
)
