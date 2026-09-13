/*
 * @Author: czy0729
 * @Date: 2026-09-13 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 19:45:00
 *
 * 开发者按钮自由拖拽与位置记忆
 */
import { useEffect, useRef } from 'react'
import { Animated, PanResponder } from 'react-native'
import { _ } from '@stores'
import { getStorage, setStorage } from '@utils/storage'
import { DEFAULT_BOTTOM, DRAG_THRESHOLD, POSITION_KEY, SIZE } from './ds'

import type { Position } from './types'

/** 默认位置 (右下角) */
function getDefaultPosition(): Position {
  return {
    x: _.window.width - SIZE - _._wind,
    y: _.window.height - DEFAULT_BOTTOM - SIZE
  }
}

/** 收进屏幕范围 */
function clamp(value: Position): Position {
  return {
    x: Math.min(Math.max(value.x, 0), _.window.width - SIZE),
    y: Math.min(Math.max(value.y, 0), _.window.height - SIZE)
  }
}

/**
 * 按钮拖拽
 *
 * - 移动超过阈值才接管手势, 小幅点按留给内部 Touchable 响应
 * - 拖动过程走 Animated, 不触发 re-render
 * - 松手收进屏幕范围并落盘, 下次挂载恢复
 */
export function useDevButtonDrag() {
  const pos = useRef(getDefaultPosition())
  const pan = useRef(new Animated.ValueXY(pos.current)).current

  // 同步当前值到 pos, 供收边与落盘使用
  useEffect(() => {
    const id = pan.addListener(value => {
      pos.current = value
    })
    return () => pan.removeListener(id)
  }, [pan])

  // 恢复上次位置
  useEffect(() => {
    getStorage<Position>(POSITION_KEY).then(value => {
      if (!value) return

      pan.setValue(clamp(value))
    })
  }, [pan])

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD,
      onPanResponderGrant: (_, { dx, dy }) => {
        // 接管前手指已先行移动, 并入 offset 保证不跳动
        pan.setOffset({
          x: pos.current.x - dx,
          y: pos.current.y - dy
        })
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false
      }),
      onPanResponderEnd: () => {
        pan.flattenOffset()

        const value = clamp(pos.current)
        pan.setValue(value)
        setStorage(POSITION_KEY, value)
      }
    })
  ).current

  return {
    pan,
    panHandlers: panResponder.panHandlers
  }
}
