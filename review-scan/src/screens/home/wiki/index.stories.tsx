/*
 * @Author: czy0729
 * @Date: 2023-04-12 01:22:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:20:56
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { SubjectWiki as Component } from '@screens'

export default {
  title: 'screens/SubjectWiki',
  component: Component
}

export const SubjectWiki = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('SubjectWiki')} />
    </StorybookList>
  </StorybookSPA>
)
