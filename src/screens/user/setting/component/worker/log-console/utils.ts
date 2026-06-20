/*
 * @Author: czy0729
 * @Date: 2026-06-20 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-20 22:46:46
 */

/** 格式化时间 */
export function formatTime(ts: number): string {
  const d = new Date(ts)
  const h = String(d.getHours()).padStart(2, '0')
  const m = String(d.getMinutes()).padStart(2, '0')
  const s = String(d.getSeconds()).padStart(2, '0')
  return `${h}:${m}:${s}`
}
