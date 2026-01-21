/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:34:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:10:04
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { NSFW as Component } from '@screens'

export default {
  title: 'screens/NSFW',
  component: Component
}

export const NSFW = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('NSFW')} />
    </StorybookList>
  </StorybookSPA>
)
