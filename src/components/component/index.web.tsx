/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:11:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-10 02:38:57
 */
import React from 'react'
import { transformStyles } from './utils'
import { Props as ComponentProps } from './types'
import './index.scss'

export { ComponentProps }

/**
 * 用于方便开发调试
 *  - App 环境不渲染额外组件
 *  - Web 环境会渲染成自定义 html 标签
 * */
export const Component = ({ id, children, ...props }: ComponentProps) => {
  const { style, ...otherProps } = props

  return React.createElement(
    id || 'div',
    {
      ...otherProps,
      style: transformStyles(
        style,
        // @ts-ignore
        children?.type
      )
    },
    children
  )
}
