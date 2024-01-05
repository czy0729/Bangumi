/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:14:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-29 21:52:38
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import InViewComp from './in-view'

/** 由于 react-native 没有原生的懒渲染, 根据滚动 y 轴控制懒渲染 */
export const InView = obc(({ index, y, children, ...other }, { $ }) => {
  // web 或者若页面没有管理的 y 轴数值, 或者传递了 index
  if (
    STORYBOOK ||
    (typeof index === 'number' && index < 8) ||
    $?.state?.visibleBottom === undefined
  ) {
    return Object.keys(other).length ? <View {...other}>{children}</View> : children
  }

  return (
    <InViewComp {...other} y={y} visibleBottom={$.state.visibleBottom}>
      {children}
    </InViewComp>
  )
})
