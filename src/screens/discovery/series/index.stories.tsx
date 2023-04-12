/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:27:10
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-04-12 10:27:10
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Series',
  component: Component
}

export const Series = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Series')} />
    </StorybookList>
  </StorybookSPA>
)
