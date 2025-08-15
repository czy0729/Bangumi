/*
 * @Author: czy0729
 * @Date: 2023-04-11 19:31:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 11:01:58
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Tinygrail',
  component: Component
}

export const Tinygrail = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Tinygrail')} />
    </StorybookList>
  </StorybookSPA>
)
