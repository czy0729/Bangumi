/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:20:28
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Manga',
  component: Component
}

export const Manga = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Manga')} />
    </StorybookList>
  </StorybookSPA>
)
