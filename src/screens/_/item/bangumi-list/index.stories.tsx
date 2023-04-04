/*
 * @Author: czy0729
 * @Date: 2023-04-05 04:12:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 04:15:30
 */
import React from 'react'
import { StorybookPage, StorybookGrid } from '@components/storybook'
import { ItemBangumiList, ItemBangumiListProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemBangumiList',
  component: ItemBangumiList
}

export const Component = (args: ItemBangumiListProps) => <ItemBangumiList {...args} />

Component.args = list[0] as ItemBangumiListProps

export const List = () => (
  <StorybookPage>
    <StorybookGrid>
      {list.map(item => (
        <ItemBangumiList key={item.subjectId} {...item} />
      ))}
    </StorybookGrid>
  </StorybookPage>
)
