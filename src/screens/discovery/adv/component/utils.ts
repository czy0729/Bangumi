/*
 * @Author: czy0729
 * @Date: 2024-07-14 17:00:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-14 17:21:17
 */
export function formatPlaytime(time: string) {
  if (!time || typeof time !== 'string') return ''

  return time
    .toLocaleLowerCase()
    .replace('very ', '超')
    .replace('long', '长')
    .replace('medium', '中')
    .replace('short', '短')
    .replace('&lt;', '小于')
    .replace('hours', '时')
    .replace('h', '时')
    .replace('m', '分')
}
