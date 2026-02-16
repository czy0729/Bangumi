/*
 * @Author: czy0729
 * @Date: 2024-11-08 05:47:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 05:47:40
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { SubjectInfo as Component } from '@screens'

export default {
  title: 'screens/SubjectInfo',
  component: Component
}

export const SubjectInfo = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('SubjectInfo')} />
    </StorybookList>
  </StorybookSPA>
)
