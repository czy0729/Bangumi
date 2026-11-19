/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:14:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 00:00:00
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { useStore } from '@stores'
import { WEB } from '@constants'
import { INVIEW_SHOW } from '@src/config'
import { Flex } from '../flex'
import { InViewContext } from './context'
import { COMPONENT, preDistance } from './ds'
import { useInView } from './hooks'
import Log from './log'
import { computeInViewY } from './utils'

export { computeInViewY }
export { InViewContext, useInViewVisible } from './context'

import type { Ctx, InViewComponentType, Props as InViewProps } from './types'
export type { InViewProps }

/** 由于 react-native 没有原生的懒渲染, 根据滚动 y 轴控制懒渲染 */
const InView = observer(
  ({ index, y, keepMounted, log = INVIEW_SHOW, flex, onLayout, children, ...other }: InViewProps) => {
    const { $ } = useStore<Ctx>(COMPONENT)

    // keepMounted 时不能走 fast path: 跳过 Provider 会让 context 恒为可见, 常驻挂载失去意义
    const isFastPath =
      WEB ||
      !$?.state ||
      !('visibleBottom' in $.state) ||
      (!keepMounted && typeof index === 'number' && index < 8)
    const hasY = typeof y === 'number'
    const targetY = y === 0 ? 1 : y

    // hasY 时外层一开始就能判断是否展示, isFastPath 短路可避免对 fast path 项引入订阅
    const [shown, setShown] = useState(
      !isFastPath &&
        hasY &&
        typeof $.state?.visibleBottom === 'number' &&
        $.state.visibleBottom + preDistance >= targetY
    )
    const handleShow = useCallback(() => setShown(true), [])

    // 已展示或 fast path 的组件不再读取 visibleBottom, 避免引入滚动订阅
    const visibleBottom = isFastPath || shown ? undefined : $.state?.visibleBottom
    const { currentY, handleLayout } = useInView({
      y: targetY,
      visibleBottom,
      onShow: handleShow,
      onLayout
    })

    if (isFastPath) {
      return Object.keys(other).length ? <View {...other}>{children}</View> : children
    }

    const Component = flex ? Flex : View

    return (
      <Component {...other} collapsable={false} onLayout={hasY ? undefined : handleLayout}>
        {keepMounted ? (
          <InViewContext.Provider value={shown}>{children}</InViewContext.Provider>
        ) : (
          shown ? children : null
        )}
        {log && <Log hasY={hasY} y={targetY} currentY={currentY} index={index} />}
      </Component>
    )
  }
) as unknown as InViewComponentType

InView.y = computeInViewY

export { InView }
export default InView
