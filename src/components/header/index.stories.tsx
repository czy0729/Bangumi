/*
 * @Author: czy0729
 * @Date: 2023-04-07 06:00:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 06:12:52
 */
import React from 'react'
import { StorybookList, StorybookPage } from '@components/storybook'
import { Text } from '@components/text'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import Header from './header-component'

export default {
  title: 'components/Header',
  component: Header
}

export const Component = args => (
  <StorybookPage>
    <StorybookList>
      <Header {...args} />
    </StorybookList>
  </StorybookPage>
)

Component.args = {
  navigation: {},
  fixed: true,
  headerTitle: (
    <Text size={18} lineHeight={50}>
      Header
    </Text>
  ),
  headerRight: () => <IconTouchable name='md-more-vert' color={_.colorTitle} />
}
