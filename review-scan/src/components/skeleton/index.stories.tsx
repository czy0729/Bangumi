/*
 * @Author: czy0729
 * @Date: 2023-04-06 11:46:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:26:45
 */
import React from 'react'
import { View } from 'react-native'
import { StorybookPage } from '@components/storybook'
import { Skeleton as Component, SkeletonProps as Props } from './index'

export default {
  title: 'components/Skeleton',
  component: Component
}

export const Skeleton = (args: Props) => (
  <StorybookPage>
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        width: 240,
        height: 136
      }}
    >
      <Component {...args} />
    </View>
  </StorybookPage>
)

Skeleton.args = {
  width: 240,
  height: 136
}
