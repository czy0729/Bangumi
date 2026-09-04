/*
 * @Author: czy0729
 * @Date: 2026-09-04 19:21:54
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-04 19:21:54
 */

/** 自定义解析格式支持的 token */
const FORMAT_TOKENS = ['YYYY', 'YY', 'MM', 'M', 'DD', 'D', 'HH', 'H', 'mm', 'm', 'ss', 's']

/** 无格式解析正则: 匹配则按本地时间解析 */
const REGEX_PARSE =
  /^(\d{4})[-/](\d{1,2})(?:[-/](\d{1,2}))?(?:[T\s](\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/

/** 带时区偏移或 Z 结尾, 交给原生 Date 按标准解析 */
const REGEX_OFFSET = /(?:Z|[+-]\d{2}:?\d{2})$/i

/**
 * 无格式解析
 *
 * 'YYYY-MM-DD' / 'YYYY-MM-DD HH:mm:ss' / 'YYYY-MM-DDTHH:mm:ss' 按本地时间解析,
 * 与 dayjs 一致; 无法识别的字符串交给原生 Date 兜底
 */
function parse(input?: string | number | Date | null): Date {
  if (input === null) return new Date(NaN)
  if (input === undefined) return new Date()
  if (input instanceof Date) return new Date(input.getTime())
  if (typeof input === 'number') return new Date(input)

  if (REGEX_OFFSET.test(input)) return new Date(input)

  const matched = input.match(REGEX_PARSE)
  if (matched) {
    const [, y, m, d, h, i, s] = matched
    return new Date(+y, +m - 1, d ? +d : 1, h ? +h : 0, i ? +i : 0, s ? +s : 0)
  }

  return new Date(input)
}

/**
 * 按 format 解析, 如 parseWithFormat('1998年11月21日', 'YYYY年M月D日')
 *
 * 支持 token: YYYY YY MM M DD D HH H mm m ss s, 其余字符按字面量匹配
 */
function parseWithFormat(input: string, format: string): Date {
  let str = input
  const values: Record<string, number> = {}

  let i = 0
  while (i < format.length) {
    const token = FORMAT_TOKENS.find(t => format.startsWith(t, i))
    if (token) {
      const re = {
        YYYY: /^(\d{4})/,
        YY: /^(\d{1,4})/,
        MM: /^(\d{2})/,
        M: /^(\d{1,2})/,
        DD: /^(\d{2})/,
        D: /^(\d{1,2})/,
        HH: /^(\d{2})/,
        H: /^(\d{1,2})/,
        mm: /^(\d{2})/,
        m: /^(\d{1,2})/,
        ss: /^(\d{2})/,
        s: /^(\d{1,2})/
      }[token] as RegExp
      const matched = str.match(re)
      if (!matched) return new Date(NaN)

      values[token] = +matched[1]
      str = str.slice(matched[0].length)
      i += token.length
    } else {
      // 非 token 字符按字面量匹配 (如 年 / 月 / 日 / - / /)
      if (!str.startsWith(format[i])) return new Date(NaN)
      str = str.slice(1)
      i += 1
    }
  }

  const year =
    values.YY !== undefined
      ? (values.YY < 69 ? 2000 : 1900) + values.YY
      : values.YYYY !== undefined
      ? values.YYYY
      : // 无年份 token 时与 dayjs customParseFormat 一致, 缺省为当前年份
        new Date().getFullYear()
  return new Date(
    year,
    (values.M !== undefined ? values.M : values.MM || 1) - 1,
    values.D !== undefined ? values.D : values.DD || 1,
    values.H !== undefined ? values.H : values.HH || 0,
    values.m !== undefined ? values.m : values.mm || 0,
    values.s !== undefined ? values.s : values.ss || 0
  )
}

export { parse, parseWithFormat }
