/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:18:00
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { SubjectCatalogs as Component } from '@screens'

export default {
  title: 'screens/SubjectCatalogs',
  component: Component
}

export const SubjectCatalogs = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('SubjectCatalogs')} />
    </StorybookList>
  </StorybookSPA>
)
