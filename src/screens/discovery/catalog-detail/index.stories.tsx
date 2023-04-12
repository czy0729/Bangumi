/*
 * @Author: czy0729
 * @Date: 2023-04-11 12:34:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 09:59:05
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

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
