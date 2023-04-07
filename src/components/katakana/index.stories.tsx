/*
 * @Author: czy0729
 * @Date: 2023-04-07 06:39:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 06:53:47
 */
import React from 'react'
import { View } from 'react-native'
import { StorybookPage } from '@components/storybook'
import { TextProps } from '@components/text'
import { _ } from '@stores'
import { Katakana } from './index'

export default {
  title: 'components/Katakana',
  component: Katakana
}

export const Component = (args: TextProps) => (
  <StorybookPage>
    <View>
      <View>
        <Katakana.Provider {...args} active>
          <Katakana {...args}>魔法少女まどか☆マギカ</Katakana>
        </Katakana.Provider>
      </View>
      <View style={_.mt.lg}>
        <Katakana.Provider {...args} active>
          <Katakana {...args}>スクールアイドル</Katakana>
        </Katakana.Provider>
      </View>
    </View>
  </StorybookPage>
)

Component.args = {
  size: 16,
  lineHeight: 20,
  bold: true
}
