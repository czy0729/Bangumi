/*
 * @Author: czy0729
 * @Date: 2022-01-11 05:20:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-11 05:54:54
 */
const onairFallback = {
  type: [],
  data: {}
}

function getData() {
  return onairFallback
}

export function pick(subjectId) {
  const { type, data } = getData()
  if (!(subjectId in data)) return ''
  return type[data[subjectId]]
}
