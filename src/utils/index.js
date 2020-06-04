/*
 * @Author: czy0729
 * @Date: 2020-06-04 17:19:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-04 17:20:48
 */

/**
 * url字符串化
 * @version 190221 1.0
 * @param {*} data
 * @param {*} encode
 */
export function urlStringify(data, encode = true) {
  if (!data) return ''

  const arr = Object.keys(data).map(
    key => `${key}=${encode ? encodeURIComponent(data[key]) : data[key]}`
  )
  return arr.join('&')
}
