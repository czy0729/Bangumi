/*
 * @Author: czy0729
 * @Date: 2026-09-03 00:12:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 00:12:41
 *
 * 开关几何计算与拖动手势判定的纯函数
 */

/** 圆圈水平位移净距离: 容器总宽 - 圆圈直径(即高度), 下限 0 防止 width < height 时圆圈移出容器 */
export function getOffset(width: number, height: number): number {
  return Math.max(0, width - height)
}

/** 圆圈直径: 容器高度 - 上下留白, 确保在容器内不溢出, 下限 0 防止非法尺寸生成负样式 */
export function getHandlerSize(height: number): number {
  return Math.max(0, height - 4)
}

/**
 * 拖动中判定松手是否允许切换
 *
 * @param value 当前开关值
 * @param dx 水平拖动距离, 右正左负
 * @returns 与切换方向同向拖动返回 true, 反向拖动达到 10px 取消阈值返回 false
 */
export function getNextToggleable(value: boolean, dx: number): boolean {
  return value ? dx < 10 : dx > -10
}
