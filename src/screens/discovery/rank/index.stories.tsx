/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:20:40
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import Component from './index'

export default {
  title: 'screens/Rank',
  component: Component
}

export const Rank = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Rank')} />
    </StorybookList>
  </StorybookSPA>
)
