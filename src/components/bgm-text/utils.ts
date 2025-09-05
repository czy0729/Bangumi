/*
 * @Author: czy0729
 * @Date: 2025-09-05 09:02:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-05 09:03:33
 */

/**
 * 从连续的私有区字符里取出“中间帧”
 * @param raw - 比如 '\ue015\ue020\ue021\ue022\ue023'
 * @returns 单个字符（找不到时返回空字符串）
 */
export function getBgmMiddleFrame(raw: string): string {
  const frames = raw.match(/[\ue000-\uf8ff]/g)
  if (!frames || frames.length === 0) return ''

  // 取数组中间位置，偶数时取偏左那一个
  const mid = Math.floor((frames.length - 1) / 2)
  return frames[mid]
}
