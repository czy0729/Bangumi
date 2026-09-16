/*
 * @Author: czy0729
 * @Date: 2026-09-16 22:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 23:15:36
 *
 * 圆环进度的纯计算函数 (与渲染解耦, 便于单测)
 */

/**
 * 计算整数百分比
 *  - total <= 0 (chunked / 服务端无 content-length) 或 loaded <= 0 (还没收到字节) 时返回 null,
 *    由调用方走不确定态
 *  - 不足 1% 也返回 null: 引擎首个进度事件通常在 0.5% 左右, floor 后是 0, 直接显示会
 *    先闪一下「空弧 + 0%」再跳到 1% (注释与用例的意图都是不出现 0%)
 *  - loaded > total (部分实现的字节口径含头部) 时收敛到 100
 * */
export function getProgressPercent(loaded: number, total: number): number | null {
  if (!Number.isFinite(loaded) || !Number.isFinite(total)) return null
  if (total <= 0 || loaded <= 0) return null

  const percent = Math.floor((loaded / total) * 100)
  if (percent <= 0) return null

  return Math.min(100, percent)
}

/**
 * 收敛到 0-100 的整数 (非有限数按 0)
 * 进度弧与中心文案必须用同一个收敛值, 否则会出现「满环 + 120%」或「33.33%」这类不一致
 * */
export function clampPercent(percent: number): number {
  if (!Number.isFinite(percent)) return 0

  return Math.max(0, Math.min(100, Math.round(percent)))
}

/** 圆环几何: 半径与周长 (stroke 居中在半径线上, 需要减去半个线宽) */
export function getCircularMetrics(size: number, strokeWidth: number) {
  const radius = Math.max(0, (size - strokeWidth) / 2)

  return {
    radius,
    circumference: 2 * Math.PI * radius
  }
}

/** 进度弧的 dashoffset: 0% 完全隐藏, 100% 整圈显示 */
export function getDashOffset(percent: number, circumference: number): number {
  const clamped = Math.max(0, Math.min(100, percent))

  return circumference * (1 - clamped / 100)
}
