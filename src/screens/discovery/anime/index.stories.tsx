/*
 * @Author: czy0729
 * @Date: 2023-04-09 08:54:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 09:53:31
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Anime',
  component: Component
}

export const Anime = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Anime')} />
    </StorybookList>
  </StorybookSPA>
)
