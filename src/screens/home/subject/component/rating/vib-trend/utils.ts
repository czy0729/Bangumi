/*
 * @Author: czy0729
 * @Date: 2025-08-27 04:55:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-27 04:57:48
 */
export function getPercentile(data: [string, number][], score: number) {
  let total = 0
  let higher = 0

  for (const [s, count] of data) {
    total += count
    if (parseFloat(s) > score) {
      higher += count
    }
  }

  return `${((1 - higher / total) * 100).toFixed(1)}%`
}
