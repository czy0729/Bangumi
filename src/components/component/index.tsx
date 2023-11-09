/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:11:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-09 08:51:55
 */
import React from 'react'
import { View } from 'react-native'
import { STORYBOOK } from '@constants'
import { transformStyles } from './utils'
import { Props as ComponentProps } from './types'

export { ComponentProps }

export const Component = ({ id, children, ...props }: ComponentProps) => {
  if (!STORYBOOK) {
    return ((Object.keys(props).length ? (
      <View {...props}>{children}</View>
    ) : (
      children
    )) || null) as JSX.Element
  }

  const { style, ...otherProps } = props
  return React.createElement(
    id || 'div',
    {
      ...otherProps,
      style: transformStyles(style)
    },
    children
  )
}
