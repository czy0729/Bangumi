/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 05:11:02
 */
import React from 'react'
import { StorybookPage, StorybookList, Flex } from '@components'
import { ItemComment as Component, ItemCommentProps as Props } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemComment',
  component: Component
}

export const Item = (args: Props) => (
  <StorybookPage radius>
    <Flex.Item>
      <Component {...args} />
    </Flex.Item>
  </StorybookPage>
)

Item.args = list[2]

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        // @ts-expect-error
        <Component key={item.userId} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
