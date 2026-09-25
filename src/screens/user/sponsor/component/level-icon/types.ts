/*
 * @Author: czy0729
 * @Date: 2023-01-07 21:53:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-07 21:53:19
 */
import type { ViewStyle } from '@types'

/** 图标基座属性 */
export type IconProps = {
  /** 图标边长 (px) */
  size?: number

  /** 主色: 线性图标为描边色, 实心图标为填充色 */
  color?: string

  /** 描边颜色, 实心图标传 none */
  stroke?: string

  /** 描边宽度 */
  strokeWidth?: number

  /** 附加样式 */
  style?: ViewStyle
}

export type LevelIconType = 'gold' | 'silver' | 'bronze'

export type Props = {
  /** 奖牌档次 */
  type: LevelIconType

  /** 边长 */
  size?: number
}

export type MedalProps = {
  /** 边长 */
  size?: number

  /** 牌面颜色 */
  main: string

  /** 内圈与牌边颜色 */
  edge: string

  /** 挂带颜色 */
  ribbon: string
}
