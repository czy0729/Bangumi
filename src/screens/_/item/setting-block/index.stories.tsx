/*
 * @Author: czy0729
 * @Date: 2023-04-05 05:38:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 05:38:42
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { _ } from '@stores'
import { ItemSettingBlock, ItemSettingBlockProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemSettingBlock',
  component: ItemSettingBlock
}

export const Component = (args: ItemSettingBlockProps) => (
  <StorybookPage>
    <ItemSettingBlock {...args} />
  </StorybookPage>
)

Component.args = list[0]

export const List = () => (
  <StorybookPage>
    <StorybookList style={_.container.wind}>
      {list.map((item, index) => (
        // @ts-expect-error
        <ItemSettingBlock key={index} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
