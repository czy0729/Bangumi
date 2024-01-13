/*
 * @Author: czy0729
 * @Date: 2023-11-02 15:05:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-13 22:06:46
 */
export function parseUrlParams() {
  const params = new URLSearchParams(window.location.search)
  const result = {}

  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}
