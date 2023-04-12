/*
 * @Author: czy0729
 * @Date: 2023-04-12 00:55:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:29:11
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

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
