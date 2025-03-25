/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:14:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-25 20:23:14
 */
import React from 'react'
import { View } from 'react-native'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { WEB } from '@constants'
import InViewComp from './in-view'
import { Ctx, Props as InViewProps } from './types'

export { InViewProps }

/** 由于 react-native 没有原生的懒渲染, 根据滚动 y 轴控制懒渲染 */
export const InView = ob(({ index, y, log, flex, children, ...other }: InViewProps) => {
  const { $ } = useStore<Ctx>()

  // 浏览器或者若页面没有管理的 y 轴数值, 或者传递了 index
  if (WEB || (typeof index === 'number' && index < 8) || $?.state?.visibleBottom === undefined) {
    return Object.keys(other).length ? <View {...other}>{children}</View> : children
  }

  return (
    <InViewComp
      {...other}
      index={index}
      y={y}
      visibleBottom={$.state.visibleBottom}
      log={log}
      flex={flex}
    >
      {children}
    </InViewComp>
  )
})

export default InView
