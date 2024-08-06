/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:27:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:15:08
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Series as Component } from '@screens'

export default {
  title: 'screens/Series',
  component: Component
}

export const Series = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Series')} />
    </StorybookList>
  </StorybookSPA>
)
