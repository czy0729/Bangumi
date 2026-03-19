/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:13:22
 */
import React from 'react'
import { Flex, StorybookList, StorybookPage } from '@components'
import { ItemCatalog as Component } from './index'
import { list } from './index.mock'

import type { ItemCatalogProps as Props } from './index'

export default {
  title: 'item/ItemCatalog',
  component: Component
}

export const Item = (args: Props) => (
  <StorybookPage radius>
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
        // @ts-expect-error
        <Component key={item.id} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
