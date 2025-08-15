/*
 * @Doc: https://github.com/RobinQu/simplebig/blob/master/index.js
 * @Author: czy0729
 * @Date: 2021-04-12 15:29:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-13 18:53:55
 */
import sc from './sc.json'
import tc from './tc.json'

const memo = {}

/** @deprecated 简转繁 */
export function s2t(str: string) {
  var ret = '',
    i: number,
    len: number,
    idx: number
  str = str || this
  for (i = 0, len = str.length; i < len; i++) {
    var s = str.charAt(i)
    var t = memo[s]
    if (t) {
      ret += t
    } else {
      idx = sc.indexOf(s)
      memo[s] = idx === -1 ? s : tc.charAt(idx)
      ret += memo[s]
    }
  }
  return ret
}

/** 繁转简 */
export function t2s(str: string) {
  var ret = '',
    i: number,
    len: number,
    idx: number
  str = str || this
  for (i = 0, len = str.length; i < len; i++) {
    idx = tc.indexOf(str.charAt(i))
    ret += idx === -1 ? str.charAt(i) : sc.charAt(idx)
  }
  return ret
}
