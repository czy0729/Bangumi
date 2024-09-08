/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:11:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 19:22:53
 */
import React from 'react'
import { View } from 'react-native'
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
  ...props
}: ComponentProps): JSX.Element | null => {
  const filteredProps = Object.keys(props).reduce((acc, key) => {
    if (!key.startsWith('data-')) acc[key] = props[key]
    return acc
  }, {})

  if (!Object.keys(filteredProps).length) return children as JSX.Element | null

  return <View {...filteredProps}>{children}</View>
}
