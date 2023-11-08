/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:11:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-08 14:27:49
 */
import React from 'react'
import { View } from 'react-native'
import { STORYBOOK } from '@constants'
import { Props as ComponentProps } from './types'

export { ComponentProps }

export const Component = ({ id, children, ...props }: ComponentProps) => {
  if (!STORYBOOK) return <View {...props}>{children}</View>

  return React.createElement(id, props, children)
}
