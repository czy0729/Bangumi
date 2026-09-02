/*
 * @Author: czy0729
 * @Date: 2026-01-16 16:04:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 02:50:21
 */
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { stl } from '@utils/utils'

import type { Route } from 'react-native-tab-view/src/types'
import type { Props } from './types'

export default function SceneView<T extends Route>({
  addEnterListener,
  navigationState,
  lazy,
  lazyPreloadDistance,
  index,
  layout,
  style,
  children
}: Props<T>) {
  const [loading, setLoading] = useState(
    Math.abs(navigationState.index - index) > lazyPreloadDistance
  )

  const handleEnter = useCallback(
    (value: number) => {
      // 翻页进入当前场景时解除懒加载占位
      if (value === index && loading) setLoading(false)
    },
    [index, loading]
  )

  useEffect(() => {
    if (loading && Math.abs(navigationState.index - index) <= lazyPreloadDistance) {
      setLoading(false)
    }
  }, [loading, navigationState.index, index, lazyPreloadDistance])

  useEffect(() => {
    if (lazy && loading) {
      // 懒加载模式下订阅翻页进入事件, 预加载距离内的场景可提前加载
      return addEnterListener(handleEnter)
    }

    if (loading) {
      // 非懒加载模式延后一帧渲染场景, 避免阻塞首帧
      const timer = setTimeout(() => setLoading(false), 0)
      return () => clearTimeout(timer)
    }
  }, [addEnterListener, lazy, loading, handleEnter])

  const focused = navigationState.index === index

  return (
    <View
      accessibilityElementsHidden={!focused}
      importantForAccessibility={focused ? 'auto' : 'no-hide-descendants'}
      style={stl(
        layout.width ? { width: layout.width } : focused ? StyleSheet.absoluteFill : null,
        style
      )}
    >
      {focused || layout.width ? children({ loading }) : null}
    </View>
  )
}
