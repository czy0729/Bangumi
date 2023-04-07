/*
 * @Author: czy0729
 * @Date: 2023-04-07 07:50:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-07 07:53:30
 */
import React from 'react'
import { StorybookPage } from '@components/storybook'
import { Flex } from '@components/flex'
import { Text } from '@components/text'
import { _ } from '@stores'
import { Touchable } from './index'

export default {
  title: 'components/Touchable',
  component: Touchable
}

export const Component = () => (
  <StorybookPage>
    <Flex direction='column'>
      <Touchable withoutFeedback>
        <Text>TouchableWithoutFeedback</Text>
      </Touchable>
      <Touchable style={_.mt.lg} highlight>
        <Text>TouchableHighlight</Text>
      </Touchable>
      <Touchable style={_.mt.lg} animate>
        <Text>TouchableAnimated</Text>
      </Touchable>
      <Touchable style={_.mt.lg}>
        <Text>TouchableOpacity</Text>
      </Touchable>
    </Flex>
  </StorybookPage>
)
