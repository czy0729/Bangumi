/*
 * @Author: czy0729
 * @Date: 2023-04-11 12:32:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 09:58:07
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Catalog',
  component: Component
}

export const Catalog = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Catalog')} />
    </StorybookList>
  </StorybookSPA>
)
