/*
 * @Author: czy0729
 * @Date: 2023-04-12 10:32:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:23:00
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { RakuenHistory as Component } from '@screens'

export default {
  title: 'screens/RakuenHistory',
  component: Component
}

export const RakuenHistory = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('RakuenHistory')} />
    </StorybookList>
  </StorybookSPA>
)
