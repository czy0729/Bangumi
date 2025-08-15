/*
 * @Author: czy0729
 * @Date: 2023-04-11 19:08:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:14:56
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Search as Component } from '@screens'

export default {
  title: 'screens/Search',
  component: Component
}

export const Search = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Search')} />
    </StorybookList>
  </StorybookSPA>
)
