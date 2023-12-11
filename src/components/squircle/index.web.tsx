/*
 * @Author: czy0729
 * @Date: 2023-12-09 13:53:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-10 03:55:59
 */
import React from 'react'
import { Squircle as SquircleComp } from 'react-ios-corners'
import { Component } from '../component'
import { getRadius } from './utils'
import { Props as SquircleProps } from './types'
import './index.scss'

export { SquircleProps }

/**
 * 仿 iOS 平滑圆角的实现
 *  - iOS 只使用 View 渲染默认圆角
 *  - android 使用 masked-view 配合 svg 做遮罩效果
 *  - web 使用 react-ios-corners 实现
 * */
export const Squircle = ({
  width = 0,
  height = 0,
  radius,
  children
}: SquircleProps) => {
  if (!radius) return children

  const _radius = getRadius(Math.min(width || height, height || width), radius)
  return (
    <Component id='component-squircle' data-radius={_radius} data-width={width}>
      <SquircleComp radius={_radius}>{children}</SquircleComp>
    </Component>
  )
}
