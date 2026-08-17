// @ts-nocheck
/* eslint-disable */
/*
 * @Author: czy0729
 * @Date: 2026-01-16 16:04:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-17 21:40:00
 */
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { stl } from '@utils/utils'

import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type {
  EventEmitterProps,
  NavigationState,
  Route,
  SceneRendererProps
} from 'react-native-tab-view/src/types'

type Props<T extends Route> = SceneRendererProps &
  EventEmitterProps & {
    navigationState: NavigationState<T>
    lazy: boolean
    lazyPreloadDistance: number
    index: number
    children: (props: { loading: boolean }) => ReactNode
    style?: StyleProp<ViewStyle>
  }

export default function SceneView<T extends Route>({
  addListener,
  removeListener,
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
      // If we're entering the current route, we need to load it
      if (value === index && loading) setLoading(false)
    },
    [index, loading]
  )

  useEffect(() => {
    if (loading && Math.abs(navigationState.index - index) <= lazyPreloadDistance) {
      // Always render the route when it becomes focused
      setLoading(false)
    }
  }, [loading, navigationState.index, index, lazyPreloadDistance])

  useEffect(() => {
    if (lazy) {
      // If lazy mode is enabled, listen to when we enter screens
      try {
        addListener('enter', handleEnter)
      } catch {}

      return () => {
        try {
          removeListener('enter', handleEnter)
        } catch {}
      }
    }

    if (loading) {
      // If lazy mode is not enabled, render the scene with a delay if not loaded already
      // This improves the initial startup time as the scene is no longer blocking
      const timer = setTimeout(() => setLoading(false), 0)
      return () => clearTimeout(timer)
    }
  }, [addListener, removeListener, lazy, loading, handleEnter])

  const focused = navigationState.index === index

  return (
    <View
      accessibilityElementsHidden={!focused}
      importantForAccessibility={focused ? 'auto' : 'no-hide-descendants'}
      style={stl(
        styles.route,
        // If we don't have the layout yet, make the focused screen fill the container
        // This avoids delay before we are able to render pages side by side
        layout.width ? { width: layout.width } : focused ? StyleSheet.absoluteFill : null,
        style
      )}
    >
      {
        // Only render the route only if it's either focused or layout is available
        // When layout is not available, we must not render unfocused routes
        // so that the focused route can fill the screen
        focused || layout.width ? children({ loading }) : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  route: {
    // width: '100%'
    // flex: 1
    // overflow: 'hidden',
  }
})
