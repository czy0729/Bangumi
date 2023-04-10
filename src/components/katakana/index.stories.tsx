/*
 * @Author: czy0729
 * @Date: 2023-04-07 06:39:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 06:53:47
 */
import React from 'react'
import { View } from 'react-native'
import { StorybookPage } from '@components/storybook'
import { TextProps as Props } from '@components/text'
import { _ } from '@stores'
import { Katakana as Component } from './index'

export default {
  title: 'components/Katakana',
  component: Component
}

export const Katakana = (args: Props) => (
  <StorybookPage>
    <View>
      <View>
        <Component.Provider {...args} active>
          <Component {...args}>魔法少女まどか☆マギカ</Component>
        </Component.Provider>
      </View>
      <View style={_.mt.lg}>
        <Component.Provider {...args} active>
          <Component {...args}>スクールアイドル</Component>
        </Component.Provider>
      </View>
    </View>
  </StorybookPage>
)

Katakana.args = {
  size: 16,
  lineHeight: 20,
  bold: true
}
