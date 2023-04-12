/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:58:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 01:03:50
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Episodes',
  component: Component
}

export const Episodes = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Episodes')} />
    </StorybookList>
  </StorybookSPA>
)
