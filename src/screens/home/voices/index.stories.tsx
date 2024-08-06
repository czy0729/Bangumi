/*
 * @Author: czy0729
 * @Date: 2023-04-12 01:22:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:20:49
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Voices as Component } from '@screens'

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
