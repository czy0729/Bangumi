/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:11:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 22:17:31
 */
import React from 'react'
import { AnyObject } from '@types'
import { parseUrlParams } from '../storybook/utils'
import { convertToDashCase, transformStyles } from './utils'
import { Props as ComponentProps } from './types'
import '../../styles/index.scss'

export { ComponentProps }

/**
 * 用于方便开发调试
 *  - App 环境不渲染额外组件
 *  - Web 环境会渲染成自定义 html 标签
 * */
export const Component = ({ id, children, ...props }: ComponentProps) => {
  const { style, 'data-title': dataTitle, ...otherProps } = props
  const passProps: AnyObject = {
    ...otherProps,
    style: transformStyles(
      style,
      // @ts-ignore
      children?.type
    )
  }
  if (dataTitle) passProps.title = dataTitle

  if (id.startsWith('screen-')) {
    Object.entries(parseUrlParams()).forEach(([key, value]) => {
      passProps[`data-${convertToDashCase(key)}`] = value
    })
  }

  return React.createElement(id || 'div', passProps, children)
}
