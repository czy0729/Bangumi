/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 17:03:51
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Recommend',
  component: Component
}

export const Recommend = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Recommend')} />
    </StorybookList>
  </StorybookSPA>
)
