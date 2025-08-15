/*
 * @Author: czy0729
 * @Date: 2024-10-12 19:56:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-12 20:00:11
 */
import { WEB } from '@constants'

const KEEP = ['id', 'viewMode', 'userId']

export function cleanQuery() {
  if (typeof window === 'undefined' || !WEB) return

  let url = new window.URL(window.location.href)
  let params = new window.URLSearchParams(url.search)
  let newParams = new window.URLSearchParams()
  for (let [key, value] of params) {
    if (KEEP.includes(key)) newParams.append(key, value)
  }
  url.search = newParams.toString()
  window.history.replaceState({}, '', url.toString())
}
