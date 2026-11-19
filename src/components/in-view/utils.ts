/*
 * @Author: czy0729
 * @Date: 2026-03-16 07:26:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 07:29:16
 */

/**
 * 计算 InView 的触发 Y 坐标
 * @param index 当前元素的索引
 * @param itemHeight 单个元素的高度
 * @param baseOffset 基础偏移量（例如顶部容器或 header 的高度）
 * @param columnCount 列数，默认为 1
 */
export function computeInViewY(
  index: number,
  itemHeight: number,
  baseOffset: number = 0,
  columnCount: number = 1
): number {
  const row = Math.floor(index / columnCount) + 1
  return Math.floor(itemHeight * row + baseOffset)
}
