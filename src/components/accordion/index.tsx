/*
 * @Author: czy0729
 * @Date: 2021-09-26 13:37:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 10:00:00
 */
import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useAccordionAnimation } from './hooks'
import { COMPONENT } from './ds'

import type { Props as AccordionProps } from './types'
export type { AccordionProps }

/** 折叠/展开容器，展开/收起均为淡入淡出 + 位移 + 缩放，动画对称 */
export const Accordion = observer(
  ({ style, expand = false, lazy = true, onAnimationEnd, children }: AccordionProps) => {
    r(COMPONENT)

    const { show, animatedStyles, handleLayout } = useAccordionAnimation({
      expand,
      lazy,
      onAnimationEnd,
      bottom: _.bottom
    })

    if (lazy && !show) return null

    return (
      <Animated.View style={stl(animatedStyles, style)} pointerEvents='box-none'>
        <View pointerEvents='box-none' onLayout={handleLayout}>
          {children}
        </View>
      </Animated.View>
    )
  }
)

export default Accordion
