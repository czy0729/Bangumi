/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:14:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-03 16:40:57
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import { WEB } from '@constants'
import InViewComp from './in-view'
import { COMPONENT } from './ds'

export { computeInViewY } from './utils'

import type { Ctx, Props as InViewProps } from './types'
export type { InViewProps }

/** 由于 react-native 没有原生的懒渲染, 根据滚动 y 轴控制懒渲染 */
export const InView = observer(
  ({ index, y, log, flex, onLayout, children, ...other }: InViewProps) => {
    const { $ } = useStore<Ctx>(COMPONENT)

    // 浏览器或者若页面没有管理的 y 轴数值, 或者传递了 index
    if (WEB || (typeof index === 'number' && index < 8) || $?.state?.visibleBottom === undefined) {
      return Object.keys(other).length ? <View {...other}>{children}</View> : children
    }

    return (
      <InViewComp
        {...other}
        index={index}
        y={y === 0 ? 1 : y}
        visibleBottom={$.state.visibleBottom}
        log={log}
        flex={flex}
        onLayout={onLayout}
      >
        {children}
      </InViewComp>
    )
  }
)

export default InView
