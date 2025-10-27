/*
 * @Author: czy0729
 * @Date: 2023-12-09 13:53:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 04:01:27
 */
import React from 'react'
import { Squircle as SquircleComp } from 'react-ios-corners'
import { observer } from 'mobx-react'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { Component } from '../component'
import Radius from './radius'
import { getRadius, getRoundness } from './utils'
import { COMPONENT } from './ds'
import { Props as SquircleProps } from './types'
import './index.scss'

export { SquircleProps }

/**
 * 仿 iOS 平滑圆角的实现
 *  - iOS 只使用 View 渲染默认圆角
 *  - android 使用 masked-view 配合 svg 做遮罩效果
 *  - web 使用 react-ios-corners 实现
 * */
export const Squircle = observer(
  ({ style, width = 0, height = 0, radius, children }: SquircleProps) => {
    r(COMPONENT)

    if (!radius) {
      return (
        <Component style={style} id='component-squircle'>
          {children}
        </Component>
      )
    }

    if (!systemStore.setting.squircle) {
      return (
        <Radius style={style} width={width} height={height} radius={radius}>
          {children}
        </Radius>
      )
    }

    const size = Math.min(width || height, height || width)
    const squircleRadius = getRadius(size, radius)
    return (
      <Component
        id='component-squircle'
        data-radius={squircleRadius}
        data-width={width}
        style={style}
      >
        <SquircleComp radius={squircleRadius} ratio={getRoundness(size, radius)}>
          {children}
        </SquircleComp>
      </Component>
    )
  }
)

export default Squircle
