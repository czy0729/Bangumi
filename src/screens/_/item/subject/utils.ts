/*
 * @Author: czy0729
 * @Date: 2026-04-12 22:18:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-12 22:28:51
 */

/** 获取平滑分布的百分比点 */
export function getSmoothTopRecent(index: number, total: number, maxPoints = 10) {
  if (!total || total <= 0) return 0

  // 计算步长：确保点与点之间有足够的 index 距离
  // 使用 Math.max(1, ...) 保证 total 极小时步长至少为 1
  const step = total > maxPoints ? Math.floor(total / maxPoints) : 1

  // 核心逻辑判断：
  // 情况 A: index 是步长的整数倍 (如 0, 10, 20...)
  // 情况 B: 最后一个点强制显示 (确保 100% 出现)
  const isStepPoint = index % step === 0
  const isLastPoint = index === total - 1

  if (isStepPoint || isLastPoint) {
    // 计算百分比并返回
    return Math.max(1, Math.floor(((index + 1) / total) * 100) - 1)
  }

  // 不在采样点上，返回 null（外部根据 null 判断是否渲染 UI）
  return null
}
