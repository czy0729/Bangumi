/*
 * @Author: czy0729
 * @Date: 2026-04-17 10:31:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-17 10:49:58
 */
import React, { useEffect, useMemo, useState } from 'react'
import { View } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { styles } from './styles'

import type { BaseItem, BlockProps, Props as DraggableGridProps } from './types'

export type { DraggableGridProps }

function DraggableBlock({
  id,
  positions,
  blockWidth,
  blockHeight,
  numColumns,
  children,
  onDragEnd,
  disabled
}: BlockProps) {
  const isDragging = useSharedValue(false)
  const startX = useSharedValue(0)
  const startY = useSharedValue(0)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)

  const animConfig = {
    duration: 180,
    easing: Easing.out(Easing.quad)
  } as const

  const getCoords = (order: number) => {
    'worklet'
    return {
      x: (order % numColumns) * blockWidth,
      y: Math.floor(order / numColumns) * blockHeight
    }
  }

  const panGesture = Gesture.Pan()
    .enabled(!disabled)
    .onStart(() => {
      isDragging.value = true
      const { x, y } = getCoords(positions.value[id] ?? 0)
      startX.value = x
      startY.value = y
      translateX.value = x
      translateY.value = y
    })
    .onUpdate(event => {
      const curX = startX.value + event.translationX
      const curY = startY.value + event.translationY
      translateX.value = curX
      translateY.value = curY

      const col = Math.round(curX / blockWidth)
      const row = Math.round(curY / blockHeight)
      const targetOrder = row * numColumns + col

      const maxOrder = Object.keys(positions.value).length - 1
      const clampedTargetOrder = Math.max(0, Math.min(targetOrder, maxOrder))
      const fromOrder = positions.value[id]

      if (clampedTargetOrder !== fromOrder) {
        const newPos = { ...positions.value }
        const keys = Object.keys(newPos)
        for (const key of keys) {
          if (key === id) continue
          const curOrder = newPos[key]
          if (fromOrder < clampedTargetOrder) {
            if (curOrder > fromOrder && curOrder <= clampedTargetOrder) {
              newPos[key] = curOrder - 1
            }
          } else {
            if (curOrder >= clampedTargetOrder && curOrder < fromOrder) {
              newPos[key] = curOrder + 1
            }
          }
        }
        newPos[id] = clampedTargetOrder
        positions.value = newPos
      }
    })
    .onEnd(() => {
      isDragging.value = false
      const { x, y } = getCoords(positions.value[id] ?? 0)
      translateX.value = withTiming(x, animConfig)
      translateY.value = withTiming(y, animConfig)
      runOnJS(onDragEnd)(positions.value)
    })

  const animatedStyle = useAnimatedStyle(() => {
    const order = positions.value[id] ?? 0
    const { x, y } = getCoords(order)

    return {
      zIndex: isDragging.value ? 100 : 1,
      width: blockWidth,
      height: blockHeight,
      transform: [
        { translateX: isDragging.value ? translateX.value : withTiming(x, animConfig) },
        { translateY: isDragging.value ? translateY.value : withTiming(y, animConfig) },
        { scale: withTiming(isDragging.value ? 1.08 : 1, { duration: 150 }) }
      ],
      elevation: isDragging.value ? 5 : 0
    } as const
  })

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.block, animatedStyle]}>
        <View style={styles.itemWrapper}>{children}</View>
      </Animated.View>
    </GestureDetector>
  )
}

export const DraggableGrid = observer(
  <T extends BaseItem>({
    data,
    numColumns,
    renderItem,
    onDragRelease,
    itemHeight
  }: DraggableGridProps<T>) => {
    const [containerWidth, setContainerWidth] = useState(0)
    const positions = useSharedValue<Record<string, number>>({})

    useEffect(() => {
      const initialPositions: Record<string, number> = {}
      data.forEach((item, index) => {
        initialPositions[String(item.key)] = index
      })
      positions.value = initialPositions
    }, [data, positions])

    const blockWidth = useMemo(() => containerWidth / numColumns, [containerWidth, numColumns])
    const blockHeight = itemHeight || blockWidth

    const onDragEnd = (finalPositions: Record<string, number>) => {
      if (!onDragRelease) return
      const sortedData = [...data].sort((a, b) => {
        return (finalPositions[String(a.key)] ?? 0) - (finalPositions[String(b.key)] ?? 0)
      })
      onDragRelease(sortedData)
    }

    const containerStyle = useMemo(() => {
      const rowCount = Math.ceil(data.length / numColumns)
      return { height: rowCount * blockHeight, width: '100%' } as const
    }, [data.length, numColumns, blockHeight])

    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={[styles.gridContainer, containerStyle]}
          onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
        >
          {containerWidth > 0 &&
            data.map(item => (
              <DraggableBlock
                key={item.key}
                id={String(item.key)}
                positions={positions}
                blockWidth={blockWidth}
                blockHeight={blockHeight}
                numColumns={numColumns}
                onDragEnd={onDragEnd}
                disabled={item.disabledDrag}
              >
                {renderItem(item, positions.value[String(item.key)] ?? 0)}
              </DraggableBlock>
            ))}
        </View>
      </GestureHandlerRootView>
    )
  }
)

export default DraggableGrid
