/*
 * @Author: czy0729
 * @Date: 2023-04-12 01:08:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:19:52
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Persons as Component } from '@screens'

export default {
  title: 'screens/Persons',
  component: Component
}

export const Persons = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Persons')} />
    </StorybookList>
  </StorybookSPA>
)
