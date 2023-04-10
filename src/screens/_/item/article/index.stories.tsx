/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 04:07:13
 */
import React from 'react'
import { StorybookPage, StorybookList, Flex } from '@components'
import { ItemArticle as Component, ItemArticleProps as Props } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemArticle',
  component: Component
}

export const Item = (args: Props) => (
  <StorybookPage>
    <Flex.Item>
      <Component {...args} />
    </Flex.Item>
  </StorybookPage>
)

Item.args = list[0]

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        <Component key={item.timestamp} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
