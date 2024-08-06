/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:18:09
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Characters as Component } from '@screens'

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
