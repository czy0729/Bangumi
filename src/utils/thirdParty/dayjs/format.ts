/*
 * @Author: czy0729
 * @Date: 2026-09-04 19:21:09
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-04 19:21:09
 */
import { pad } from './utils'

/** 格式 token, 长 token 优先匹配 */
const FORMAT_TOKENS = ['YYYY', 'YY', 'MM', 'DD', 'HH', 'mm', 'ss', 'M', 'D', 'H', 'm', 's']

/** 日期各分量 (本地时间或指定偏移下) */
export interface Components {
  y: number
  m: number
  d: number
  h: number
  i: number
  s: number
}

/**
 * 格式化
 *
 * 支持 YYYY YY MM DD HH mm ss M D H m s 与 [...] 字面量转义
 *
 * 不支持 Z / ZZ / ddd / dddd / A 等 token, 未识别的字符按字面量输出,
 * 需要这些能力请改用 [...] 转义或自行拼接
 *
 * 默认格式不含 Z: 原版 dayjs 需 utc 插件才会输出 +08:00 偏移,
 * 自研未实现偏移输出, 保留 Z 会静默产出语义错误的字符串
 */
function format(c: Components, fmt: string = 'YYYY-MM-DDTHH:mm:ss'): string {
  const map: Record<string, string> = {
    YY: `${c.y}`.slice(-2),
    YYYY: `${c.y}`,
    MM: pad(c.m + 1),
    DD: pad(c.d),
    HH: pad(c.h),
    mm: pad(c.i),
    ss: pad(c.s),
    M: `${c.m + 1}`,
    D: `${c.d}`,
    H: `${c.h}`,
    m: `${c.i}`,
    s: `${c.s}`
  }

  let result = ''
  let i = 0
  while (i < fmt.length) {
    const char = fmt[i]
    if (char === '[') {
      const end = fmt.indexOf(']', i)
      result += end === -1 ? fmt.slice(i + 1) : fmt.slice(i + 1, end)
      i = end === -1 ? fmt.length : end + 1
      continue
    }
    const token = FORMAT_TOKENS.find(t => fmt.startsWith(t, i))
    if (token) {
      result += map[token]
      i += token.length
      continue
    }
    result += char
    i += 1
  }
  return result
}

export { format }
