/*
 * @Author: czy0729
 * @Date: 2023-11-27 16:29:11
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-11-27 16:29:11
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/LoginToken',
  component: Component
}

export const LoginToken = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('LoginToken')} />
    </StorybookList>
  </StorybookSPA>
)
