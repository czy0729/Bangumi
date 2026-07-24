/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:11:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-25 06:08:21
 */
import React from 'react'
import { View } from 'react-native'

import type { Props as ComponentProps } from './types'
export type { ComponentProps }

/**
 * 用于方便开发调试
 *  - App 环境不渲染额外组件
 *  - Web 环境会渲染成自定义 html 标签
 * */
export function Component({
  id,
  parseParams,
  children = null,
  ...otherProps
}: ComponentProps): JSX.Element | null {
  // 提前检查是否有非 data- 的 props，发现第一个就立即返回
  const keys = Object.keys(otherProps)
  for (let i = 0; i < keys.length; i++) {
    if (!keys[i].startsWith('data-')) {
      return <View {...otherProps}>{children}</View>
    }
  }

  return children as JSX.Element | null
}
