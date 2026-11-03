/*
 * @Author: czy0729
 * @Date: 2026-09-24 13:50:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-24 13:50:40
 *
 * 横轴刻度与柱状图渲染数据类型
 */

/** 横轴刻度: 标注文本与相对图表区左偏移 */
export type Label = {
  /** 标注文本 */
  label: string

  /** 相对图表区左偏移 */
  left: number
}

/** 单根柱子 */
export type Bar = {
  /** 周起始时间戳, 同时作为渲染 key */
  w: number

  /** 该周提交数 */
  c: number

  /** 在统计区间内的下标 */
  index: number

  /** 相对图表区左偏移 */
  x: number

  /** 相对图表区顶部偏移 */
  y: number

  /** 柱宽 */
  width: number

  /** 柱高 */
  height: number
}

/** 柱状图渲染数据: 只与数据与图表尺寸有关 */
export type BarStat = {
  /** 纵轴最大值 */
  max: number

  /** 坐标系底部 y */
  bottom: number

  /** 单柱占位宽度 */
  barWidth: number

  /** 纵轴刻度值 */
  ticks: number[]

  /** 横轴刻度 */
  months: Label[]

  /** 柱子几何数据 */
  bars: Bar[]
}
