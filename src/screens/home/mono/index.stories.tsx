/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:58:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 01:02:28
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

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
