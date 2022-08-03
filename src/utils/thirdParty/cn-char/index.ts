/*
 * 繁体简体互转
 * @Doc: https://github.com/RobinQu/simplebig/blob/master/index.js
 * @Author: czy0729
 * @Date: 2021-04-12 15:29:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-03 09:00:03
 */
import sc from './sc.json'
import tc from './tc.json'

const s2tMemo = {}

export function s2t(str) {
  var ret = '',
    i,
    len,
    idx
  str = str || this
  for (i = 0, len = str.length; i < len; i++) {
    var s = str.charAt(i)
    var t = s2tMemo[s]
    if (t) {
      ret += t
    } else {
      idx = sc.indexOf(s)
      s2tMemo[s] = idx === -1 ? s : tc.charAt(idx)
      ret += s2tMemo[s]
    }
  }
  return ret
}

export function t2s(str) {
  var ret = '',
    i,
    len,
    idx
  str = str || this
  for (i = 0, len = str.length; i < len; i++) {
    idx = tc.indexOf(str.charAt(i))
    ret += idx === -1 ? str.charAt(i) : sc.charAt(idx)
  }
  return ret
}
