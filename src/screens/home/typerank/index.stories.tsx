/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:54:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-01 09:06:28
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Typerank',
  component: Component
}

export const Typerank = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Typerank')} />
    </StorybookList>
  </StorybookSPA>
)
