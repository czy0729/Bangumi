/*
 * @Author: czy0729
 * @Date: 2023-11-19 12:00:43
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-11-19 12:00:43
 */
export function timeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()

  // @ts-expect-error
  const timeDiff = now - date
  const seconds = Math.floor(timeDiff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)

  if (years > 0) return `${years}年前`
  if (months > 0) return `${months}月前`
  if (days > 0) return `${days}天前`
  if (hours > 0) return `${hours}小时前`
  if (minutes > 0) return `${minutes}分钟前`
  return `${seconds}秒前`
}
