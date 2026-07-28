/*
 * @Author: czy0729
 * @Date: 2026-07-28 16:02:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-28 16:09:06
 */
import type { ViewStyle } from '@types'

export interface Layout {
  /** 元素左上角 X 坐标 */
  x: number

  /** 元素左上角 Y 坐标 */
  y: number

  /** 元素宽度 */
  width: number

  /** 元素高度 */
  height: number
}

/** 自定义标签渲染函数 */
export type RenderLabel = (item: {
  /** 标签样式 */
  style: ViewStyle

  /** 标签文字 */
  title: string

  /** 标签唯一标识 */
  tabKey: string
}) => JSX.Element

/** 吸顶导航栏溢出内容组件 */
export interface OverflowComponents {
  /** 滚动到顶部后溢出的头部内容 */
  OverflowHeaderComponent?: JSX.Element

  /** 吸顶导航栏顶部内容 */
  TopNavbarComponent?: JSX.Element
}
