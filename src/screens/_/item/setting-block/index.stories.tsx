/*
 * @Author: czy0729
 * @Date: 2023-04-05 05:38:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 06:28:25
 */
import React from 'react'
import { Flex, StorybookList, StorybookPage } from '@components'
import { ItemSettingBlock as Component } from './index'
import { list } from './index.mock'

import type { ItemSettingBlockProps as Props } from './index'

export default {
  title: 'item/ItemSettingBlock',
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
    <StorybookList space>
      {list.map((item, index) => (
        // @ts-expect-error
        <Component key={index} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
