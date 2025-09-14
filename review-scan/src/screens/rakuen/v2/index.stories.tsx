/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:24:32
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Rakuen as Component } from '@screens'

export default {
  title: 'screens/Rakuen',
  component: Component
}

export const Rakuen = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Rakuen')} />
    </StorybookList>
  </StorybookSPA>
)
