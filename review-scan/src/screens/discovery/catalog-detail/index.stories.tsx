/*
 * @Author: czy0729
 * @Date: 2023-04-11 12:34:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 02:54:47
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { CatalogDetail as Component } from '@screens'

export default {
  title: 'screens/CatalogDetail',
  component: Component
}

export const CatalogDetail = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('CatalogDetail')} />
    </StorybookList>
  </StorybookSPA>
)
