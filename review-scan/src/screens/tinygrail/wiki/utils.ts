/*
 * @Author: czy0729
 * @Date: 2025-05-13 05:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-13 15:39:45
 */
export function startsWithNumberDot(str: string) {
  return /^\d\./.test(str)
}

export function startsWithNumberDotNumber(str: string) {
  return /^\d\.\d/.test(str)
}

export function startsWithURL(str: string) {
  return /^url=/.test(str)
}
