/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:58:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:19:44
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Mono as Component } from '@screens'

export default {
  title: 'screens/Mono',
  component: Component
}

export const Mono = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Mono')} />
    </StorybookList>
  </StorybookSPA>
)
