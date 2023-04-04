/*
 * @Author: czy0729
 * @Date: 2023-04-05 01:44:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 05:11:02
 */
import React from 'react'
import { StorybookPage, StorybookList } from '@components/storybook'
import { ItemComment, ItemCommentProps } from './index'
import { list } from './index.mock'

export default {
  title: 'item/ItemComment',
  component: ItemComment
}

export const Component = (args: ItemCommentProps) => (
  <StorybookPage>
    <ItemComment {...args} />
  </StorybookPage>
)

Component.args = list[2]

export const List = () => (
  <StorybookPage>
    <StorybookList>
      {list.map(item => (
        // @ts-expect-error
        <ItemComment key={item.userId} {...item} />
      ))}
    </StorybookList>
  </StorybookPage>
)
