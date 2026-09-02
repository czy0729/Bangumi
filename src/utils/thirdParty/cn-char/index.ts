/*
 * @Author: czy0729
 * @Date: 2021-04-12 15:29:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 05:00:45
 */
import sc from './sc.json'
import tc from './tc.json'

const t2sMap = new Map<string, string>()

// 与原 indexOf 实现语义一致: 均以 tc 字符串中字符的首次出现为准
for (let i = 0; i < tc.length; i++) {
  const t = tc.charAt(i)
  if (!t2sMap.has(t)) t2sMap.set(t, sc.charAt(i))
}

/** 繁转简 */
export function t2s(str: string = ''): string {
  let ret = ''
  for (const s of str) {
    ret += t2sMap.get(s) || s
  }
  return ret
}
