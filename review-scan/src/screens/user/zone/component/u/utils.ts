/*
 * @Author: czy0729
 * @Date: 2024-06-27 07:02:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-27 07:27:28
 */
import { AnyObject } from '@types'

export function formatString(data: AnyObject = {}) {
  const { e } = data
  if (!e) return data

  // {
  //   e: {
  //     "A.B": 1
  //   }
  // }
  const event: AnyObject = {}
  const tinygrail: AnyObject = {}
  Object.entries(e).forEach(([key, value]) => {
    const [path, action] = key.split('.')
    if (/^T[A-Z]/.test(path)) {
      if (!(path in tinygrail)) tinygrail[path] = {}
      tinygrail[path][action] = value
    } else {
      if (!(path in event)) event[path] = {}
      event[path][action] = value
    }
  })
  return {
    ...data,
    e: event,
    tinygrail
  }
}
