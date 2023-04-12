/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:45:12
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Webhook',
  component: Component
}

export const Webhook = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Webhook')} />
    </StorybookList>
  </StorybookSPA>
)
