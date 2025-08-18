/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:34:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-06 03:06:57
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { Hentai as Component } from '@screens'

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
