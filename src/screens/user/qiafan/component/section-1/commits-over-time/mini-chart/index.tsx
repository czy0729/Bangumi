/*
 * @Author: czy0729
 * @Date: 2026-09-23 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-24 13:16:40
 */
import { useCallback, useEffect, useMemo, useRef } from 'react'
import { View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import Svg, { Path, Polyline, Rect } from 'react-native-svg'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { scheduleOnRN } from '@utils/worklets'
import { COLOR, MINI_HANDLE_INSET, MINI_PADDING_BOTTOM, MINI_PADDING_TOP } from '../../ds'
import { getEvenYearLabels, getMaxCount } from '../../utils'
import { styles } from './styles'

import type { MiniChartProps } from '../types'

/** 总览缩略图, 左右拖动平移上方图表的显示区间 */
function MiniChart({ weeks, width, height, start, end, onMove }: MiniChartProps) {
  /** 拖拽期间只有选择框位置在变, 折线与年份刻度全部缓存 */
  const stat = useMemo(() => {
    if (!weeks.length) return null

    /** 首尾两点间距的分母, 只有 1 周时退化为 1 避免除零 */
    const span = Math.max(weeks.length - 1, 1)
    const max = getMaxCount(weeks)
    const drawableHeight = height - MINI_PADDING_TOP - MINI_PADDING_BOTTOM
    const points = weeks.map((item, index) => {
      const x = (index / span) * width
      const y = height - MINI_PADDING_TOP - (item.c / max) * drawableHeight
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })

    return {
      span,
      line: points.join(' '),
      area: `M${points.join(' L')} L${width.toFixed(1)},${height} L0,${height} Z`,
      years: getEvenYearLabels(weeks, width)
    }
  }, [weeks, width, height])

  /** 区间像素换算参数, worklet 里读不到组件变量, 用 shared value 传入 */
  const span = stat?.span || 1
  const selectWidth = Math.max(((end - start) / span) * width, 2)
  const maxSelectX = Math.max(width - selectWidth, 0)
  const restX = Math.min((start / span) * width, maxSelectX)

  const widthSV = useSharedValue(width)
  const maxSelectXSV = useSharedValue(maxSelectX)
  const spanSV = useSharedValue(span)
  widthSV.value = width
  maxSelectXSV.value = maxSelectX
  spanSV.value = span

  /** 手势基准: 拖动开始时的选择框左偏移 */
  const dragStartX = useSharedValue(0)
  const isDragging = useSharedValue(false)
  const translateX = useSharedValue(restX)

  /** 数据刷新或外部 start 变化时, 非拖动态下选择框归位到对应周 */
  useEffect(() => {
    if (!isDragging.value) translateX.value = restX
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restX])

  /** 松手提交: worklet 里只能捕获稳定引用, 内部再读最新的 onMove */
  const onMoveRef = useRef(onMove)
  onMoveRef.current = onMove
  const submit = useCallback((nextStart: number) => {
    onMoveRef.current(nextStart)
  }, [])

  const panGesture = Gesture.Pan()
    .activeOffsetX([-4, 4])
    .onStart(() => {
      isDragging.value = true
      dragStartX.value = translateX.value
    })
    .onUpdate(event => {
      const next = dragStartX.value + event.translationX
      translateX.value = Math.max(0, Math.min(next, maxSelectXSV.value))
    })
    .onEnd(() => {
      isDragging.value = false

      /** 像素位置 -> 起始周下标, 吸附到整格后提交给 JS 侧更新大图 */
      const nextStart = Math.round((translateX.value / widthSV.value) * spanSV.value)
      const snappedX = Math.min((nextStart / spanSV.value) * widthSV.value, maxSelectXSV.value)
      translateX.value = withTiming(snappedX, { duration: 120 })
      scheduleOnRN(submit, nextStart)
    })

  /** 选择框位置完全由 translateX 驱动: 拖动中跟手, 松手时已吸附 */
  const selectStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }))

  if (!stat) return null

  const handleHeight = height - MINI_HANDLE_INSET * 2 - 2

  return (
    <View
      style={[
        styles.mini,
        {
          width,
          height
        }
      ]}
    >
      <Svg width={width} height={height}>
        <Rect x={0} y={0} width={width} height={height} rx={2} fill={COLOR.miniBg} />
        <Path d={stat.area} fill={COLOR.miniArea} />
        <Polyline points={stat.line} fill='none' stroke={COLOR.miniLine} strokeWidth={1} />
      </Svg>
      {stat.years.map(item => (
        <Text
          key={item.label}
          style={[
            styles.miniYear,
            {
              left: item.left - 14
            }
          ]}
        >
          {item.label}
        </Text>
      ))}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={[
            styles.selectBox,
            {
              top: 1,
              width: selectWidth,
              height: height - 2
            },
            selectStyle
          ]}
        >
          <View
            style={[
              styles.handle,
              {
                left: 0,
                top: MINI_HANDLE_INSET - 1,
                height: handleHeight
              }
            ]}
          />
          <View
            style={[
              styles.handle,
              {
                right: 0,
                top: MINI_HANDLE_INSET - 1,
                height: handleHeight
              }
            ]}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  )
}

export default observer(MiniChart)
