/*
 * @Doc: https://github.com/RobinQu/simplebig/blob/master/index.js
 * @Author: czy0729
 * @Date: 2021-04-12 15:29:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-03 19:18:27
 */
import sc from './sc.json'
import tc from './tc.json'

const memo: Record<string, string> = {}

/** @deprecated 简转繁 */
export function s2t(str: string = ''): string {
  let ret = ''
  for (const s of str) {
    if (memo[s]) {
      ret += memo[s]
    } else {
      const idx = sc.indexOf(s)
      memo[s] = idx === -1 ? s : tc.charAt(idx)
      ret += memo[s]
    }
  }
  return ret
}

/** 繁转简 */
export function t2s(str: string = ''): string {
  let ret = ''
  for (const s of str) {
    const idx = tc.indexOf(s)
    ret += idx === -1 ? s : sc.charAt(idx)
  }
  return ret
}
