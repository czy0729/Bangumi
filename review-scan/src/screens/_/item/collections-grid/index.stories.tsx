/*
 * @Author: czy0729
 * @Date: 2023-04-05 00:01:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 04:53:21
 */
import React from 'react'
import { StorybookPage, StorybookGrid } from '@components'
import {
  ItemCollectionsGrid as Component,
  ItemCollectionsGridProps as Props
} from './index'
import { list } from './index.mock'

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
