/*
 * @Author: czy0729
 * @Date: 2023-03-11 17:36:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-10 23:52:00
 */
export type Props = {
  /** 自定义渐变颜色数组，覆盖默认主题色 */
  shimmerColors?: [string, string, string]

  /** 渐变颜色风格，默认 'app' */
  type?: 'app' | 'tinygrail'

  /** 骨架屏宽度 */
  width?: number

  /** 骨架屏高度 */
  height?: number

  /** 动画时长（毫秒），默认 1600 */
  duration?: number
}

/** 骨架屏渐变颜色所需的主题色板 */
export type ShimmerColorPalette = {
  /** 浅色模式背景 */
  colorBg: string

  /** 浅色模式图标色 */
  colorIcon: string

  /** 深色模式层级 1 */
  darkLevel1: string

  /** 深色模式层级 2 */
  darkLevel2: string
}
