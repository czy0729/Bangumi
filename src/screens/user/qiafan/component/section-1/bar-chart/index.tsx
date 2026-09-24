/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-24 13:35:17
 */
import { useCallback, useMemo, useRef, useState } from 'react'
import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import Svg, { Line, Rect } from 'react-native-svg'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { feedback } from '@utils'
import { scheduleOnRN } from '@utils/worklets'
import {
  BADGE_HEIGHT,
  BAR_BOTTOM,
  BAR_GAP,
  BAR_INSET,
  BAR_MIN_HEIGHT,
  BAR_MIN_WIDTH,
  COLOR,
  TICK_TEXT_MIN_BOTTOM,
  YEAR_MIN_GAP
} from '../ds'
import { formatWeek, getEvenMonthLabels, getMaxCount, getMonthLabels, getTicks } from '../utils'
import { styles } from './styles'

import type { Props } from './types'

/** badge 半宽估算, 用于跟手平移时居中 */
const BADGE_HALF_WIDTH = 52

/** 每周提交数柱状图, 触摸平移查看某周明细 */
function BarChart({ weeks, width, height, label, withYearLabel }: Props) {
  /** 刻度、年份、柱子位置只与数据尺寸有关 */
  const stat = useMemo(() => {
    if (!weeks.length) return null

    const max = getMaxCount(weeks)
    const barWidth = width / weeks.length

    /** 坐标系底部抬离图表下缘, 0 刻度与柱子不再贴底 */
    const bottom = height - BAR_BOTTOM
    const usableHeight = bottom - BAR_INSET

    /** 每格给右侧留 BAR_GAP 缝, 密集时柱子之间仍有分割 */
    const gap = Math.min(BAR_GAP, Math.max(barWidth - BAR_MIN_WIDTH, 0))
    const w = Math.max(BAR_MIN_WIDTH, barWidth - gap)

    return {
      max,
      bottom,
      barWidth,
      ticks: getTicks(max),
      months: withYearLabel
        ? getEvenMonthLabels(weeks, width, 5, true)
        : getMonthLabels(weeks, width, YEAR_MIN_GAP),
      bars: weeks.map((item, index) => {
        const barHeight = Math.max(BAR_MIN_HEIGHT, (item.c / max) * usableHeight)
        return {
          key: item.w,
          w: item.w,
          c: item.c,
          index,
          x: index * barWidth,
          y: bottom - barHeight,
          width: w,
          height: barHeight
        }
      })
    }
  }, [weeks, width, height, withYearLabel])

  /** 当前探查的周下标, -1 表示未触摸 */
  const [active, setActive] = useState(-1)
  const activeRef = useRef(-1)
  activeRef.current = active

  /** badge 中心横坐标, 跟手驱动 */
  const badgeX = useSharedValue(0)
  const showBadge = useSharedValue(false)

  /** worklet 里读不到组件变量, 用 shared value 传图表参数 */
  const barWidthSV = useSharedValue(0)
  const widthSV = useSharedValue(width)
  const countSV = useSharedValue(0)
  barWidthSV.value = stat?.barWidth || 0
  widthSV.value = width
  countSV.value = stat?.bars.length || 0

  /** index 变化时更新 state + 震动; 稳定引用供 worklet 调用 */
  const applyIndex = useCallback((index: number) => {
    if (index === activeRef.current) return
    activeRef.current = index
    setActive(index)
    feedback(true)
  }, [])
  const hideBadge = useCallback(() => {
    activeRef.current = -1
    setActive(-1)
  }, [])

  const panGesture = Gesture.Pan()
    .activeOffsetX([-2, 2])
    .onStart(event => {
      const index = Math.max(0, Math.min(Math.floor(event.x / barWidthSV.value), countSV.value - 1))
      showBadge.value = true
      badgeX.value = (index + 0.5) * barWidthSV.value
      scheduleOnRN(applyIndex, index)
    })
    .onUpdate(event => {
      const index = Math.max(0, Math.min(Math.floor(event.x / barWidthSV.value), countSV.value - 1))
      badgeX.value = (index + 0.5) * barWidthSV.value
      scheduleOnRN(applyIndex, index)
    })
    .onFinalize(() => {
      showBadge.value = false
      scheduleOnRN(hideBadge)
    })

  /** badge 跟手: 横坐标居中于当前柱子, 纵向固定在图表顶部, 不超出图表边缘 */
  const badgeStyle = useAnimatedStyle(
    () =>
      ({
        opacity: showBadge.value ? 1 : 0,
        transform: [
          {
            translateX: Math.max(
              0,
              Math.min(badgeX.value - BADGE_HALF_WIDTH, widthSV.value - BADGE_HALF_WIDTH * 2)
            )
          }
        ]
      } as const)
  )

  if (!stat) return null

  const activeBar = active >= 0 ? stat.bars[active] : null

  return (
    <Flex>
      <View style={[styles.axis, { height }]}>
        {stat.ticks.map(tick => (
          <Text
            key={tick}
            style={[
              styles.tick,
              {
                /** 0 刻度兜底上移, 避免文字中心压底边线被裁 */
                bottom: Math.max(
                  BAR_BOTTOM + (tick / stat.max) * stat.bottom - 5,
                  TICK_TEXT_MIN_BOTTOM
                )
              }
            ]}
          >
            {tick}
          </Text>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        <GestureDetector gesture={panGesture}>
          <View>
            <Svg width={width} height={height}>
              {stat.ticks.map(tick => {
                const y = stat.bottom - (tick / stat.max) * stat.bottom
                return (
                  <Line
                    key={tick}
                    x1={0}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke={COLOR.grid}
                    strokeWidth={1}
                    strokeDasharray='2 3'
                    opacity={0.6}
                  />
                )
              })}
              {stat.bars.map(item => (
                <Rect
                  key={item.key}
                  x={item.x}
                  y={item.y}
                  width={item.width}
                  height={item.height}
                  fill={item.index === active ? COLOR.barActive : COLOR.bar}
                />
              ))}
              <Line
                x1={0}
                y1={stat.bottom - 0.5}
                x2={width}
                y2={stat.bottom - 0.5}
                stroke={COLOR.border}
                strokeWidth={1}
              />
            </Svg>
            <Animated.View
              style={[
                styles.badge,
                {
                  height: BADGE_HEIGHT
                },
                badgeStyle
              ]}
              pointerEvents='none'
            >
              {!!activeBar && (
                <>
                  <Text style={styles.badgeValue} bold>
                    {activeBar.c} commits
                  </Text>
                  <Text style={styles.badgeText}>{formatWeek(activeBar.w)}</Text>
                </>
              )}
            </Animated.View>
          </View>
        </GestureDetector>
        <View style={styles.months}>
          {stat.months.map(item => (
            <Text
              key={item.label}
              style={[
                styles.month,
                {
                  left: item.left - 22
                }
              ]}
            >
              {item.label}
            </Text>
          ))}
        </View>
      </View>
      {!!label && (
        <View style={styles.side}>
          <Text style={styles.sideText}>{label}</Text>
        </View>
      )}
    </Flex>
  )
}

export default observer(BarChart)
