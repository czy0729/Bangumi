/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:29:46
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Characters',
  component: Component
}

export const Characters = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Characters')} />
    </StorybookList>
  </StorybookSPA>
)
