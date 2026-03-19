/*
 * @Author: czy0729
 * @Date: 2023-04-05 00:01:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:24:02
 */
import React from 'react'
import { StorybookGrid, StorybookPage } from '@components'
import { ItemCollectionsGrid as Component } from './index'
import { list } from './index.mock'

import type { ItemCollectionsGridProps as Props } from './index'

export default {
  title: 'item/ItemCollectionsGrid',
  component: Component
}

export const Item = (args: Props) => <Component {...args} />

Item.args = list[2]

export const List = () => (
  <StorybookPage>
    <StorybookGrid space>
      {list.map(item => (
        <Component key={item.id} {...item} />
      ))}
    </StorybookGrid>
  </StorybookPage>
)
