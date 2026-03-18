/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-17 23:56:35
 */
import React from 'react'
import { Flex, StorybookList, StorybookPage } from '@components'
import { ItemComment as Component } from './index'
import { list } from './index.mock'

import type { ItemCommentProps as Props } from './index'

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
        <Component key={item.userId} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
