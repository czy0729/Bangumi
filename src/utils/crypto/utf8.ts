/*
 * @Author: czy0729
 * @Date: 2026-09-01 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 00:00:00
 */

/**
 * 将 UTF-16 字符串编码为 UTF-8 字节
 *
 * 两遍法：先统计字节长度以精确预分配，再单趟填充，避免动态扩容。
 * 孤立代理项（不成对的 high/low surrogate）按 U+FFFD 编码。
 *
 * @param str - 待编码字符串
 * @returns UTF-8 字节
 */
export function utf8Encode(str: string): Uint8Array {
  const len = str.length

  // 纯 ASCII 快速通道：绝大多数调用 (URL、hex、JSON 密文键名) 命中
  let isAscii = true
  for (let i = 0; i < len; i++) {
    if (str.charCodeAt(i) > 0x7f) {
      isAscii = false
      break
    }
  }
  if (isAscii) {
    const out = new Uint8Array(len)
    for (let i = 0; i < len; i++) out[i] = str.charCodeAt(i)
    return out
  }

  // 第一遍：统计字节长度
  let byteLen = 0
  for (let i = 0; i < len; i++) {
    const c = str.charCodeAt(i)
    if (c < 0x80) {
      byteLen += 1
    } else if (c < 0x800) {
      byteLen += 2
    } else if (c >= 0xd800 && c < 0xdc00) {
      // high surrogate: 仅与后续 low surrogate 成对时合法
      if (i + 1 < len) {
        const next = str.charCodeAt(i + 1)
        if (next >= 0xdc00 && next < 0xe000) {
          byteLen += 4
          i++
          continue
        }
      }
      byteLen += 3
    } else if (c >= 0xdc00 && c < 0xe000) {
      // 孤立 low surrogate
      byteLen += 3
    } else {
      byteLen += 3
    }
  }

  const out = new Uint8Array(byteLen)

  // 第二遍：填充
  let j = 0
  for (let i = 0; i < len; i++) {
    const c = str.charCodeAt(i)
    if (c < 0x80) {
      out[j++] = c
    } else if (c < 0x800) {
      out[j++] = 0xc0 | (c >> 6)
      out[j++] = 0x80 | (c & 0x3f)
    } else if (c >= 0xd800 && c < 0xdc00) {
      if (i + 1 < len) {
        const next = str.charCodeAt(i + 1)
        if (next >= 0xdc00 && next < 0xe000) {
          const cp = 0x10000 + (((c & 0x3ff) << 10) | (next & 0x3ff))
          out[j++] = 0xf0 | (cp >> 18)
          out[j++] = 0x80 | ((cp >> 12) & 0x3f)
          out[j++] = 0x80 | ((cp >> 6) & 0x3f)
          out[j++] = 0x80 | (cp & 0x3f)
          i++
          continue
        }
      }
      out[j++] = 0xef
      out[j++] = 0xbf
      out[j++] = 0xbd
    } else if (c >= 0xdc00 && c < 0xe000) {
      out[j++] = 0xef
      out[j++] = 0xbf
      out[j++] = 0xbd
    } else {
      out[j++] = 0xe0 | (c >> 12)
      out[j++] = 0x80 | ((c >> 6) & 0x3f)
      out[j++] = 0x80 | (c & 0x3f)
    }
  }

  return out
}

/**
 * 将 UTF-8 字节解码为 UTF-16 字符串
 *
 * 单趟解码，码元按块拼接避免大字符串栈溢出。
 * 非法序列（截断、越界 continuation、超长编码、代理区码点）按 U+FFFD 容错，不抛错。
 * @param bytes - UTF-8 字节
 * @returns 解码后字符串
 */
export function utf8Decode(bytes: Uint8Array): string {
  const len = bytes.length
  const parts: string[] = []
  let buf: number[] = []

  const flush = () => {
    if (buf.length) {
      parts.push(String.fromCharCode.apply(null, buf))
      buf = []
    }
  }

  const push = (cp: number) => {
    if (cp >= 0x10000) {
      // 码元缓冲达到阈值时落盘, 预留代理对的余量
      if (buf.length >= 0x1000) flush()
      buf.push(0xd800 + ((cp - 0x10000) >> 10), 0xdc00 + ((cp - 0x10000) & 0x3ff))
    } else {
      if (buf.length >= 0x1000) flush()
      buf.push(cp)
    }
  }

  let i = 0
  while (i < len) {
    const b0 = bytes[i++]
    if (b0 < 0x80) {
      push(b0)
      continue
    }

    let need = 0
    let cp = 0
    if (b0 >= 0xc2 && b0 < 0xe0) {
      need = 1
      cp = b0 & 0x1f
    } else if (b0 >= 0xe0 && b0 < 0xf0) {
      need = 2
      cp = b0 & 0x0f
    } else if (b0 >= 0xf0 && b0 < 0xf5) {
      need = 3
      cp = b0 & 0x07
    } else {
      // 0x80-0xc1 (越界 continuation / 超长头) 与 0xf5-0xff (非法头)
      push(0xfffd)
      continue
    }

    // 取 need 个合法 continuation, 不足或非法则整段回退为 U+FFFD
    let valid = true
    let consumed = 0
    while (consumed < need) {
      if (i + consumed >= len || (bytes[i + consumed] & 0xc0) !== 0x80) {
        valid = false
        break
      }
      cp = (cp << 6) | (bytes[i + consumed] & 0x3f)
      consumed++
    }
    if (!valid) {
      push(0xfffd)
      continue
    }

    // 超长编码与代理区/越界码点
    if (
      (need === 1 && cp < 0x80) ||
      (need === 2 && cp < 0x800) ||
      (need === 3 && cp < 0x10000) ||
      (cp >= 0xd800 && cp < 0xe000) ||
      cp > 0x10ffff
    ) {
      i += consumed
      push(0xfffd)
      continue
    }

    i += consumed
    push(cp)
  }

  flush()
  return parts.join('')
}

/**
 * 字节转小写十六进制字符串
 * @param bytes - 字节序列
 * @returns 小写 hex
 */
export function bytesToHex(bytes: Uint8Array): string {
  const HEX = '0123456789abcdef'
  const out = new Uint8Array(bytes.length * 2)
  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i]
    out[i * 2] = HEX.charCodeAt(b >> 4)
    out[i * 2 + 1] = HEX.charCodeAt(b & 0x0f)
  }
  return String.fromCharCode.apply(null, Array.from(out))
}
