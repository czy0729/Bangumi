/*
 * @Author: czy0729
 * @Date: 2023-04-04 16:15:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 15:28:56
 */
import React from 'react'
import { _ } from '@stores'
import { Flex } from '../flex'
import { Text, TextProps } from './index'

export default {
  title: 'components/Text',
  component: Text
}

export const Component = (args: TextProps) => (
  <Flex direction='column'>
    <Text {...args} type='main' size={20} />
    <Text style={_.mt.md} {...args} type='warning' size={18} />
    <Text style={_.mt.md} {...args} type='primary' size={16} />
    <Text style={_.mt.md} {...args} type='desc' size={14} />
    <Text style={_.mt.md} {...args} type='sub' size={12} />
  </Flex>
)

Component.args = {
  size: 16,
  children: 'Bangumi 番组计划'
} as TextProps
