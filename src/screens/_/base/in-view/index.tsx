/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:14:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-08 00:00:00
 */
import React, { useCallback, useState } from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex } from '@components'
import { useStore } from '@stores'
import { WEB } from '@constants'
import { INVIEW_SHOW } from '@src/config'
import { useInView } from './hooks'
import Log from './log'
import { computeInViewY } from './utils'
import { COMPONENT, preDistance } from './ds'

export { computeInViewY }

import type { Ctx, InViewComponentType, Props as InViewProps } from './types'
export type { InViewProps }

/** 由于 react-native 没有原生的懒渲染, 根据滚动 y 轴控制懒渲染 */
const InView = observer(
  ({ index, y, log = INVIEW_SHOW, flex, onLayout, children, ...other }: InViewProps) => {
    const { $ } = useStore<Ctx>(COMPONENT)

    const isFastPath =
      WEB || (typeof index === 'number' && index < 8) || !$?.state || !('visibleBottom' in $.state)
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
        {shown ? children : null}
        {log && <Log hasY={hasY} y={targetY} currentY={currentY} index={index} />}
      </Component>
    )
  }
) as unknown as InViewComponentType

InView.y = computeInViewY

export { InView }
export default InView
