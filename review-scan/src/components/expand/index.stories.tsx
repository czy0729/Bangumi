/*
 * @Author: czy0729
 * @Date: 2023-04-06 12:14:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 13:43:58
 */
import React from 'react'
import { StorybookList, StorybookPage } from '@components/storybook'
import { Text } from '@components/text'
import { Expand as Component, ExpandProps as Props } from './index'

export default {
  title: 'components/Expand',
  component: Component
}

export const Expand = (args: Props) => (
  <StorybookPage>
    <StorybookList wind space>
      <Component {...args}>
        <Text lineHeight={18}>
          2024年，世界发生了史无前例的灾难，然后15年过去了。
          成为废墟的日本栖息着一种食人的怪物（蛭子），人们艰难地生存着。
          在东京·中野经营万事屋的的斩子接受了一个神秘女人的委托，“带这个孩子去天国”。
          这个被留下的名叫真流的孩子说“天国好像有人和我长得一模一样。”
          除此之外他什么都不知道。 “天国”究竟在哪里？ 当你到达那里时会发生什么......？
          真流和斩子寻找天国的旅程现在开始了——！
        </Text>
      </Component>
    </StorybookList>
  </StorybookPage>
)

Expand.args = {
  ratio: 0.33
}
