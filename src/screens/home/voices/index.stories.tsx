/*
 * @Author: czy0729
 * @Date: 2023-04-12 01:22:32
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-04-12 01:22:32
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Voices',
  component: Component
}

export const Voices = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Voices')} />
    </StorybookList>
  </StorybookSPA>
)
