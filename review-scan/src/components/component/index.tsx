/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:11:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 06:14:50
 */
import React from 'react'
import { View } from 'react-native'
import { AnyObject } from '@types'
import { Props as ComponentProps } from './types'

export { ComponentProps }

/**
 * 用于方便开发调试
 *  - App 环境不渲染额外组件
 *  - Web 环境会渲染成自定义 html 标签
 * */
export const Component = ({
  id,
  parseParams,
  children = null,
  ...otherProps
}: ComponentProps): JSX.Element | null => {
  const filteredProps: AnyObject = Object.keys(otherProps).reduce((acc, key) => {
    if (!key.startsWith('data-')) acc[key] = otherProps[key]
    return acc
  }, {})

  if (!Object.keys(filteredProps).length) return children as JSX.Element | null

  return <View {...otherProps}>{children}</View>
}
