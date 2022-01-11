/*
 * @Author: czy0729
 * @Date: 2022-01-11 05:20:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-11 05:54:54
 */
let onairFallback = {
  type: [],
  data: {}
}

function getData() {
  if (!onairFallback.type.length)
    onairFallback = require('@constants/json/thirdParty/onair.min.json')
  return onairFallback
}

export function pick(subjectId) {
  const { type, data } = getData()
  if (!(subjectId in data)) return ''
  return type[data[subjectId]]
}
