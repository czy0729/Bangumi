/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 18:01:54
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Dollars',
  component: Component
}

export const Dollars = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Dollars')} />
    </StorybookList>
  </StorybookSPA>
)
