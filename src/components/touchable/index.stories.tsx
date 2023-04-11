/*
 * @Author: czy0729
 * @Date: 2023-04-07 07:50:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 12:57:49
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Flex } from '@components/flex'
import { Text } from '@components/text'
import { _ } from '@stores'
import { Touchable as Component } from './index'

export default {
  title: 'components/Touchable',
  component: Component
}

export const Touchable = () => (
  <StorybookPage>
    <Flex direction='column'>
      <Component withoutFeedback>
        <Text>TouchableWithoutFeedback</Text>
      </Component>
      <Component style={_.mt.lg} highlight>
        <Text>TouchableHighlight</Text>
      </Component>
      <Component style={_.mt.lg} animate>
        <Text>TouchableAnimated</Text>
      </Component>
      <Component style={_.mt.lg}>
        <Text>TouchableOpacity</Text>
      </Component>
    </Flex>
  </StorybookPage>
)
