/*
 * @Author: czy0729
 * @Date: 2019-08-08 11:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-08 12:11:12
 */

/**
 * 匹配头像地址
 * https://jsperf.com/czy0729-001
 * @param {*} str
 */
export function matchAvatar(str = '') {
  return str.substring(22, str.indexOf('?'))
}

/**
 * 匹配用户Id
 * https://jsperf.com/czy0729-002
 * @param {*} str
 */
export function matchUserId(str = '') {
  return str.substring(str.lastIndexOf('/') + 1)
}
