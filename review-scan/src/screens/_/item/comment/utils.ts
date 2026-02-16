/*
 * @Author: czy0729
 * @Date: 2024-01-05 18:54:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-05 18:54:07
 */

/**
 * 由于爬出的 html 做了去除空格操作
 * 还原本来有操作的时间字符串
 */
export function formatTime(str = '') {
  if (str.indexOf('ago') === -1) {
    // date
    const { length } = str
    return `${str.slice(2, length - 5)} ${str.slice(length - 5, length)}`
  }

  // ago
  return str.replace('d', 'd ').replace('h', 'h ').replace('m', 'm ').replace('s', 's ')
}
