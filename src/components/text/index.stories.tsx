/*
 * @Author: czy0729
 * @Date: 2023-04-04 18:15:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 01:02:20
 */
import React from 'react'
import { Text, TextProps } from './index'

export default {
  title: 'components/Text',
  component: Text
}

export const Component = (args: TextProps) => <Text {...args} />

Component.args = {
  type: 'main',
  children: 'Hello World'
} as TextProps
