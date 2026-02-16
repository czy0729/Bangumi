/*
 * @Author: czy0729
 * @Date: 2023-04-04 16:15:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:57:51
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Flex } from '@components/flex'
import { _ } from '@stores'
import { Text as Component, TextProps as Props } from './index'

export default {
  title: 'components/Text',
  component: Component
}

export const Text = (args: Props) => (
  <StorybookPage>
    <Flex direction='column'>
      <Component {...args} type='main'>
        main
      </Component>
      <Component style={_.mt.lg} {...args} type='warning'>
        warning
      </Component>
      <Component style={_.mt.lg} {...args} type='primary'>
        primary
      </Component>
      <Component style={_.mt.lg} {...args} type='success'>
        success
      </Component>
      <Component style={_.mt.lg} {...args} type='danger'>
        danger
      </Component>
      <Component style={_.mt.lg} {...args} type='title'>
        title
      </Component>
      <Component style={_.mt.lg} {...args} type='desc'>
        desc
      </Component>
      <Component style={_.mt.lg} {...args} type='sub'>
        sub
      </Component>
    </Flex>
  </StorybookPage>
)

Text.args = {
  size: 16
}
