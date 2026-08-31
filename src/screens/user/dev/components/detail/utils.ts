/*
 * @Author: czy0729
 * @Date: 2026-03-15 06:30:45
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-03-15 06:30:45
 */
export function formatString(data: Record<string, any> = {}) {
  const { e } = data
  if (!e) return data

  // {
  //   e: {
  //     "A.B": 1
  //   }
  // }
  const event: Record<string, any> = {}
  const tinygrail: Record<string, any> = {}
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
