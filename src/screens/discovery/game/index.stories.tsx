/*
 * @Author: czy0729
 * @Date: 2023-04-09 09:20:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:02:57
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Game',
  component: Component
}

export const Game = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Game')} />
    </StorybookList>
  </StorybookSPA>
)
