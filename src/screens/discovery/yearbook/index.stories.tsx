/*
 * @Author: czy0729
 * @Date: 2023-04-11 19:47:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:49:09
 */
import React from 'react'
import { StorybookSPA, StorybookList, StorybookNavigation } from '@components'
import Component from './index'

export default {
  title: 'screens/Yearbook',
  component: Component
}

export const Yearbook = () => {
  return (
    <StorybookSPA>
      <StorybookList>
        <Component navigation={StorybookNavigation} />
      </StorybookList>
    </StorybookSPA>
  )
}
