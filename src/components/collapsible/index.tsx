/*
 * @Author: czy0729
 * @Date: 2022-06-25 17:18:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-10 06:37:44
 */
import React from 'react'
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { useCollapsibleAnimation } from './hooks'

import type { Props as CollapsibleProps } from './types'
export type { CollapsibleProps }

/**
 * 自动判断高度的折叠组件，可替代手风琴
 * 自研实现（Reanimated），抹平各平台差异；子组件懒挂载，首次展开后才渲染
 * 高度未知（未测量/内容为空）时不约束高度，让内容按自然高度显示（iOS 上内容在
 * height:0 容器内无法正常布局测量）；测量到内容高度后高度始终以数字形式出现在
 * animated style 中，避免 Reanimated 移除 height 后原生侧残留旧值导致"收起后展不开"
 */
export const Collapsible = observer(
  ({
    collapsed,
    collapsedHeight = 0,
    duration = 300,
    easing = 'easeOutCubic',
    enablePointerEvents = false,
    onAnimationEnd,
    style,
    children
  }: CollapsibleProps) => {
    r(COMPONENT)

    const { renderChildren, animatedStyle, handleLayout, contentStyle } = useCollapsibleAnimation({
      collapsed,
      collapsedHeight,
      duration,
      easing,
      onAnimationEnd
    })

    return (
      <Animated.View
        style={animatedStyle}
        pointerEvents={!enablePointerEvents && collapsed ? 'none' : 'auto'}
      >
        {renderChildren && (
          <Animated.View style={stl(style, contentStyle)} onLayout={handleLayout}>
            {children}
          </Animated.View>
        )}
      </Animated.View>
    )
  }
)

export default Collapsible
