/*
 * @Author: czy0729
 * @Date: 2022-01-11 05:20:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-30 22:38:26
 */

/** 兜底结构: type 为星期列表, data 为 条目 id → type 下标 */
const onairFallback = {
  type: [],
  data: {}
}

function getData() {
  return onairFallback
}

/** 取条目的放送星期, 无记录返回空串 */
export function pick(subjectId) {
  const { type, data } = getData()
  if (!(subjectId in data)) return ''
  return type[data[subjectId]]
}
