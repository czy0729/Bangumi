/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:33:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 02:55:40
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Dollars as Component } from '@screens'

export default {
  title: 'screens/Dollars',
  component: Component
}

export const Dollars = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Dollars')} />
    </StorybookList>
  </StorybookSPA>
)
