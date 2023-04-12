/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:54:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:30:25
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Tag',
  component: Component
}

export const Tag = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Tag')} />
    </StorybookList>
  </StorybookSPA>
)
