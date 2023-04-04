/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 04:07:13
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { ItemArticle, ItemArticleProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemArticle',
  component: ItemArticle
}

export const Component = (args: ItemArticleProps) => (
  <StorybookPage>
    <ItemArticle {...args} />
  </StorybookPage>
)

Component.args = list[0] as ItemArticleProps

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        <ItemArticle key={item.timestamp} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
