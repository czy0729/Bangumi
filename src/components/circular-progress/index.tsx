/*
 * @Author: czy0729
 * @Date: 2026-09-16 22:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 23:15:21
 *
 * 圆环进度指示器 (SVG 双环: 底层轨道 + 上层进度弧, 中心显示整数百分比)
 *
 * 不确定态 (percent 非法): 空环 (四分之一弧) 匀速旋转, 不显示数字, 见 hooks.ts 的 useSpin。
 * showText=false: 确定态也只画进度弧, 不渲染中心百分比。
 * 旋转刻意用 RN 核心 Animated 而非 reanimated: 两端 (reanimated 3.6 / 4.5) API 一致且可原生驱动,
 * 避免为一次简单旋转引入版本差异判断。
 */
import { Animated, View } from 'react-native'
import Svg, { Circle, G } from 'react-native-svg'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { Text } from '../text'
import { useSpin } from './hooks'
import { clampPercent, getCircularMetrics, getDashOffset } from './utils'
import { COMPONENT, INDETERMINATE_PERCENT, TRACK_OPACITY } from './ds'
import { styles } from './styles'

import type { Props } from './types'

export const CircularProgress = observer(
  ({
    size = 40,
    strokeWidth = 2.5,
    percent,
    color = _.colorIcon,
    textSize = 10,
    showText = true,
    style
  }: Props) => {
    r(COMPONENT)

    const indeterminate = typeof percent !== 'number' || !Number.isFinite(percent)
    const { radius, circumference } = getCircularMetrics(size, strokeWidth)
    // 弧长与中心文案共用同一个收敛值, 避免「满环 + 120%」这类不一致
    const percentValue = indeterminate ? INDETERMINATE_PERCENT : clampPercent(percent)
    const dashOffset = getDashOffset(percentValue, circumference)

    const spin = useSpin(indeterminate)
    const cx = size / 2

    return (
      <View style={[styles.container, { width: size, height: size }, style]}>
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
          <Svg width={size} height={size}>
            {/* 起点转到 12 点方向: 默认 dash 从 3 点开始, 不旋转观看上会很别扭 */}
            <G rotation={-90} origin={`${cx}, ${cx}`}>
              <Circle
                cx={cx}
                cy={cx}
                r={radius}
                stroke={color}
                strokeOpacity={TRACK_OPACITY}
                strokeWidth={strokeWidth}
                fill='none'
              />
              <Circle
                cx={cx}
                cy={cx}
                r={radius}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap='round'
                fill='none'
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={dashOffset}
              />
            </G>
          </Svg>
        </Animated.View>
        {!indeterminate && showText && (
          <Text style={styles.text} size={textSize} type='sub'>
            {percentValue}%
          </Text>
        )}
      </View>
    )
  }
)

export default CircularProgress
