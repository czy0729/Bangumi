/*
 * @Author: czy0729
 * @Date: 2023-04-12 01:22:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 01:23:11
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

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
