/*
 * @Author: czy0729
 * @Date: 2023-04-11 12:32:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 02:54:30
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Catalog as Component } from '@screens'

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
