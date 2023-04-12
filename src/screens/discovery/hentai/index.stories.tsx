/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:34:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-12 10:03:36
 */
import React from 'react'
import { StorybookSPA, StorybookList, getStorybookArgs } from '@components'
import Component from './index'

export default {
  title: 'screens/Hentai',
  component: Component
}

export const Hentai = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('Hentai')} />
    </StorybookList>
  </StorybookSPA>
)
