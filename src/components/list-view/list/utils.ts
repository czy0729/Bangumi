/*
 * @Author: czy0729
 * @Date: 2026-08-21 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-21 16:30:00
 */

/**
 * 计算前缀和偏移数组
 * offsets[i] 为第 i 项之前全部条目高度之和，未测量项回退到 estimate
 * 供 getItemLayout 预计算复用，将单次查询降为 O(1)
 */
export function buildOffsets(heights: number[], estimate: number, length: number): number[] {
  const offsets = new Array<number>(length)
  let sum = 0
  for (let i = 0; i < length; i += 1) {
    offsets[i] = sum
    sum += heights[i] ?? estimate
  }
  return offsets
}

/**
 * 根据已测量的高度数组计算 getItemLayout 返回值
 * 未测量项回退到 estimate，保证首遍渲染也有可用的长度与偏移
 * baseOffset 用于补偿 ListHeaderComponent 等位于条目之前的内容高度
 * offsets 可传入 buildOffsets 的预计算结果，避免每次调用重复累加
 */
export function getItemLayout(
  heights: number[],
  estimate: number,
  index: number,
  baseOffset: number = 0,
  offsets?: number[]
): {
  length: number
  offset: number
  index: number
} {
  const resolved = offsets ?? buildOffsets(heights, estimate, Math.max(heights.length, index))
  return {
    length: heights[index] ?? estimate,
    offset: baseOffset + (resolved[index] ?? index * estimate),
    index
  }
}
