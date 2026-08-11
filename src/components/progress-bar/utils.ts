/*
 * @Author: czy0729
 * @Date: 2026-08-11 10:00:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-08-11 10:00:00
 */
/** 归一化进度到 0-100 */
export function normalPercent(percent?: number): number {
  if (typeof percent !== 'number' || Number.isNaN(percent) || percent <= 0) {
    return 0
  }
  return percent > 100 ? 100 : percent
}

/** 按容器宽度计算进度条像素宽度 */
export function getWidth(wrapWidth: number, percent?: number): number {
  return (wrapWidth * normalPercent(percent)) / 100
}