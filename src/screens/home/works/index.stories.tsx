/*
 * @Author: czy0729
 * @Date: 2023-04-12 01:24:22
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-04-12 01:24:22
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Works',
  component: Component
}

export const Works = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Works')} />
    </StorybookList>
  </StorybookSPA>
)
