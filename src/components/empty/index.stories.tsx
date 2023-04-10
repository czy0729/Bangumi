/*
 * @Author: czy0729
 * @Date: 2023-04-06 12:23:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-06 12:24:45
 */
import React from 'react'
import { View } from 'react-native'
import { StorybookPage } from '@components/storybook'
import { _ } from '@stores'
import { Empty as Component, EmptyProps as Props } from './index'

export default {
  title: 'components/Empty',
  component: Component
}

export const Empty = (args: Props) => (
  <StorybookPage>
    <View style={styles.content}>
      <Component {...args} />
    </View>
  </StorybookPage>
)

const styles = _.create({
  content: {
    width: 320
  }
})
