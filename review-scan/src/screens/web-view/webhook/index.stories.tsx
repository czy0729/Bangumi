/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:31:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:30:29
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Webhook as Component } from '@screens'

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
