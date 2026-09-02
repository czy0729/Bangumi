/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:09:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 14:17:50
 */
import React from 'react'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Edge } from 'react-native-safe-area-context'
import type { Props as SafeAreaViewProps } from './types'
export type { SafeAreaViewProps }

/** 保留的四个方向 */
const ALL_EDGES: Edge[] = ['top', 'bottom', 'left', 'right']

/**
 * v3 forceInset 语义映射: 显式 'never' 的方向从 edges 中剔除, 其余方向保留
 * (vertical 同时作用于 top/bottom, horizontal 同时作用于 left/right)
 * */
function toEdges(forceInset: SafeAreaViewProps['forceInset']): Edge[] {
  if (!forceInset) return ALL_EDGES

  return ALL_EDGES.filter(dir => {
    const value =
      forceInset[dir] ??
      (dir === 'top' || dir === 'bottom' ? forceInset.vertical : forceInset.horizontal)
    return value !== 'never'
  })
}

export const SafeAreaView = observer(
  ({
    style,
    forceInset = {
      top: 'never'
    },
    children,
    ...other
  }: SafeAreaViewProps) => {
    r(COMPONENT)

    return (
      <RNSafeAreaView style={stl(_.container.screen, style)} edges={toEdges(forceInset)} {...other}>
        {children}
      </RNSafeAreaView>
    )
  }
)

export default SafeAreaView
