/*
 * @Author: czy0729
 * @Date: 2026-06-20 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-20 22:46:46
 */
import { date } from '@utils'

/** 格式化时间 (HH:mm:ss, ts 为毫秒时间戳) */
export function formatTime(ts: number): string {
  return date('H:i:s', Math.floor(ts / 1000))
}
