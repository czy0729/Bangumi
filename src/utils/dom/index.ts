/*
 * @Author: czy0729
 * @Date: 2023-04-14 17:37:34
 * @Last Modified by:   czy0729
 * @Last Modified time: 2023-04-14 17:37:34
 */
export function isMobile() {
  const ua = navigator.userAgent.toLowerCase()
  const keywords = ['android', 'iphone', 'ipod', 'ipad', 'windows phone', 'mqqbrowser']
  return keywords.some(keyword => ua.indexOf(keyword) !== -1)
}
