/*
 * @Author: czy0729
 * @Date: 2022-09-29 20:22:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 00:57:41
 */

/* ------------------------------------
 * 循环引用
 * ------------------------------------ */

/** 处理循环引用 */
export function handleCircular(): (key: string, value: unknown) => unknown {
  const cache: unknown[] = []
  const keyCache: string[] = []

  return (key: string, value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      const index = cache.indexOf(value)
      if (index !== -1) return `[Circular ${keyCache[index]}]`

      cache.push(value)
      keyCache.push(key || 'root')
    }
    return value
  }
}

/* ------------------------------------
 * 时间
 * ------------------------------------ */

/** 补零 */
function pad(n: string | number): string {
  return +n < 10 ? `0${n}` : `${n}`
}

/** 当前时间戳字符串 (HH:mm:ss) */
export function now() {
  const now = new Date()
  return `${now.getHours()}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
}

/* ------------------------------------
 * 字符串
 * ------------------------------------ */

/**
 * 计算字符串在终端中的显示宽度
 * 中文等 CJK 字符为双宽 (2), 其余字符为单宽 (1)
 */
export function getDisplayWidth(str: string): number {
  let width = 0
  for (let i = 0; i < str.length; i += 1) {
    const code = str.charCodeAt(i)
    // CJK Unified Ideographs 范围: U+4E00 - U+9FA5
    if (code >= 0x4e00 && code <= 0x9fa5) {
      width += 2
    } else {
      width += 1
    }
  }
  return width
}

/** 按显示宽度将字符串右侧填充空格到指定宽度, 超宽则原样返回 */
export function padDisplay(str: string, width: number): string {
  const spaces = width - getDisplayWidth(str)
  return spaces > 0 ? `${str}${' '.repeat(spaces)}` : str
}

/** 字符串填充 */
export function fill(str: string, len: number = 32, mark: string = ' ') {
  if (!len) return str

  let _str = str
  if (_str.length > len) return _str

  for (let i = _str.length; i < len; i += 1) _str += mark
  return _str
}
