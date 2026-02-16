/*
 * @Author: czy0729
 * @Date: 2024-09-28 15:44:31
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-09-28 15:44:31
 */
import React from 'react'
import { getStorybookArgs, StorybookList, StorybookSPA } from '@components'
import { WordCloud as Component } from '@screens'

export default {
  title: 'screens/WordCloud',
  component: Component
}

export const WordCloud = () => (
  <StorybookSPA>
    <StorybookList>
      <Component {...getStorybookArgs('WordCloud')} />
    </StorybookList>
  </StorybookSPA>
)
