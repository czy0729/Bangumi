/*
 * @Author: czy0729
 * @Date: 2026-09-16 22:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 22:40:00
 *
 * 圆环进度的类型定义 (Props 与内部类型别名)
 */
import type { Animated } from 'react-native'
import type { ViewStyle } from '@types'

export type Props = {
  /** 圆环直径 */
  size?: number

  /** 线宽 */
  strokeWidth?: number

  /**
   * 进度百分比 (0-100 整数)
   * 传 null / undefined / 非法值即进入不确定态: 空环匀速旋转, 不显示数字
   * (服务端无 content-length、命中缓存不回调、Web 端等拿不到真实进度的场景)
   * */
  percent?: number | null

  /** 进度弧颜色 (轨道为其降透明度版本) */
  color?: string

  /** 中心数字字号 */
  textSize?: number

  /**
   * 是否显示中心百分比数字, 默认 true
   * 传 false 时确定态也只画进度弧 (不确定态本来就不显示数字), 适合只想要进度感、不需要具体数值的场景
   * 注意: Web 端为 ActivityIndicator 降级, 该属性无意义
   * */
  showText?: boolean

  /** 容器样式 */
  style?: ViewStyle
}

/** 旋转插值 (挂到 transform rotate; 确定态恒为 0deg) */
export type SpinInterpolation = Animated.AnimatedInterpolation<string>
