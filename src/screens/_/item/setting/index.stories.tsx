/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 05:34:27
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { _ } from '@stores'
import { ItemSetting, ItemSettingProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemSetting',
  component: ItemSetting
}

export const Component = (args: ItemSettingProps) => (
  <StorybookPage>
    <ItemSetting {...args} />
  </StorybookPage>
)

Component.args = list[0]

export const List = () => (
  <StorybookPage>
    <StorybookList style={_.container.wind}>
      {list.map((item, index) => (
        // @ts-expect-error
        <ItemSetting key={index} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
