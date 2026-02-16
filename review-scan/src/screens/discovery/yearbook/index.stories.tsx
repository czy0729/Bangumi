/*
 * @Author: czy0729
 * @Date: 2023-04-11 19:47:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:17:52
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Yearbook as Component } from '@screens'

export default {
  title: 'screens/Yearbook',
  component: Component
}

export const Yearbook = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Yearbook')} />
    </StorybookList>
  </StorybookSPA>
)
