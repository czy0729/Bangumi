/*
 * @Author: czy0729
 * @Date: 2026-01-31 16:27:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-31 16:33:38
 */
import { getTimestamp } from '@utils'

export function parseRelativeTimeToTs(time: string): number | null {
  const now = getTimestamp()

  if (!time) return null

  // 5分18秒前
  let match = time.match(/(\d+)分/)
  if (match) return now - Number(match[1]) * 60

  // 1时20分前 / 1时前
  match = time.match(/(\d+)时/)
  if (match) return now - Number(match[1]) * 3600

  // 今天（保守处理：当作 6 小时前）
  if (time.includes('今天')) return now - 6 * 3600

  return null
}
