/*
 * @Author: czy0729
 * @Date: 2021-04-12 15:29:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 17:49:52
 */
import sc from './sc.json'
import tc from './tc.json'

const s2tMap = new Map<string, string>()
const t2sMap = new Map<string, string>()

// 与原 indexOf 实现语义一致: 均以各自字符串中字符的首次出现为准
for (let i = 0; i < sc.length; i++) {
  const s = sc.charAt(i)
  if (!s2tMap.has(s)) s2tMap.set(s, tc.charAt(i))
}
for (let i = 0; i < tc.length; i++) {
  const t = tc.charAt(i)
  if (!t2sMap.has(t)) t2sMap.set(t, sc.charAt(i))
}

/** @deprecated 简转繁 */
export function s2t(str: string = ''): string {
  let ret = ''
  for (const s of str) {
    ret += s2tMap.get(s) || s
  }
  return ret
}

/** 繁转简 */
export function t2s(str: string = ''): string {
  let ret = ''
  for (const s of str) {
    ret += t2sMap.get(s) || s
  }
  return ret
}
