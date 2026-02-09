/*
 * @Author: czy0729
 * @Date: 2023-11-08 14:11:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-10 07:12:36
 */
import React from 'react'
import '../../styles/index.scss'
import { parseUrlParams } from '../storybook/utils'
import { convertToDashCase, transformStyles } from './utils'

import type { AnyObject } from '@types'
import type { CustomClassnames, Props as ComponentProps } from './types'

export type { ComponentProps }

/**
 * 用于方便开发调试
 *  - App 环境不渲染额外组件
 *  - Web 环境会渲染成自定义 html 标签
 * */
export function Component({ id, parseParams = false, children, ...props }: ComponentProps) {
  const { style, 'data-title': dataTitle, ...otherProps } = props
  const styles = transformStyles(
    style,
    // @ts-ignore
    children?.type
  )

  const classNames: CustomClassnames[] = []
  if (styles.position === 'relative') {
    classNames.push('p-r')
    delete styles.position
  }

  // @ts-ignore
  if (styles.display === 'block') {
    classNames.push('d-b')
    delete styles.display
  }

  const passProps: AnyObject = {
    class: classNames.length ? classNames.join(' ') : undefined,
    ...otherProps,
    style: Object.keys(styles).length ? styles : undefined,
    title: dataTitle ? dataTitle : undefined
  }

  if (parseParams && id.startsWith('screen-')) {
    Object.entries(parseUrlParams()).forEach(([key, value]) => {
      passProps[`data-${convertToDashCase(key)}`] = value
    })
  }

  return React.createElement(id || 'div', passProps, children)
}
