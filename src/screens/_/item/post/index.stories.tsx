/*
 * @Author: czy0729
 * @Date: 2023-04-05 02:25:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 02:42:15
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { ItemPost, ItemPostProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemPost',
  component: ItemPost
}

export const Component = (args: ItemPostProps) => (
  <StorybookPage>
    <ItemPost {...args} />
  </StorybookPage>
)

Component.args = list[7] as ItemPostProps

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        <ItemPost key={item.id} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
