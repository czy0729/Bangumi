/*
 * @Author: czy0729
 * @Date: 2023-04-11 20:03:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:31:17
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/LoginV2',
  component: Component
}

export const LoginV2 = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('LoginV2')} />
    </StorybookList>
  </StorybookSPA>
)
