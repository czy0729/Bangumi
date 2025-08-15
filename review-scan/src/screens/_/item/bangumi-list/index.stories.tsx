/*
 * @Author: czy0729
 * @Date: 2023-04-05 04:12:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 04:15:30
 */
import React from 'react'
import { StorybookPage, StorybookGrid } from '@components'
import { ItemBangumiList as Component, ItemBangumiListProps as Props } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemBangumiList',
  component: Component
}

export const Item = (args: Props) => <Component {...args} />

Item.args = list[0]

export const List = () => (
  <StorybookPage>
    <StorybookGrid space>
      {list.map(item => (
        <Component key={item.subjectId} {...item} />
      ))}
    </StorybookGrid>
  </StorybookPage>
)
