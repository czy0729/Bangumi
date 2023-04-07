/*
 * @Author: czy0729
 * @Date: 2023-04-04 16:15:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 08:00:36
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Flex } from '@components/flex'
import { _ } from '@stores'
import { Text, TextProps } from './index'

export default {
  title: 'components/Text',
  component: Text
}

export const Component = (args: TextProps) => (
  <StorybookPage>
    <Flex direction='column'>
      <Text {...args} type='main'>
        main
      </Text>
      <Text style={_.mt.lg} {...args} type='warning'>
        warning
      </Text>
      <Text style={_.mt.lg} {...args} type='primary'>
        primary
      </Text>
      <Text style={_.mt.lg} {...args} type='success'>
        success
      </Text>
      <Text style={_.mt.lg} {...args} type='danger'>
        danger
      </Text>
      <Text style={_.mt.lg} {...args} type='title'>
        title
      </Text>
      <Text style={_.mt.lg} {...args} type='desc'>
        desc
      </Text>
      <Text style={_.mt.lg} {...args} type='sub'>
        sub
      </Text>
    </Flex>
  </StorybookPage>
)

Component.args = {
  size: 16
} as TextProps
