/*
 * @Author: czy0729
 * @Date: 2022-06-17 20:20:46
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-17 20:20:46
 */
export function matchSubjectId(url = '') {
  if (typeof url !== 'string') return 0

  const match = url.match(/\d+/)
  if (match && match.length) return match[0]

  return 0
}
