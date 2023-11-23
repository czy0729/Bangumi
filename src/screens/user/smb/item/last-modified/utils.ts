/*
 * @Author: czy0729
 * @Date: 2023-11-24 05:15:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-24 05:23:42
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
  const months = Math.floor(
    now.getMonth() +
      now.getFullYear() * 12 -
      (date.getMonth() + date.getFullYear() * 12)
  )
  const years = Math.floor(months / 12)

  if (years > 0) {
    if (months % 12 > 0) {
      return `${years}年${months % 12}月前`
    } else {
      return `${years}年前`
    }
  }

  if (months > 0) {
    if (days > 0) {
      return `${months}月${days}天前`
    } else if (hours > 0) {
      return `${months}月${hours}小时前`
    } else {
      return `${months}月前`
    }
  }

  if (days > 0) {
    if (hours > 0) {
      return `${days}天${hours}小时前`
    } else if (minutes > 0) {
      return `${days}天${minutes}分钟前`
    } else {
      return `${days}天前`
    }
  }

  if (hours > 0) {
    if (minutes > 0) {
      return `${hours}小时${minutes}分钟前`
    } else if (seconds > 0) {
      return `${hours}小时${seconds}秒前`
    } else {
      return `${hours}小时前`
    }
  }

  if (minutes > 0) {
    return `${minutes}分钟${seconds}秒前`
  }

  return `${seconds}秒前`
}
