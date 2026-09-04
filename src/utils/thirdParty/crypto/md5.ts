/*
 * @Author: czy0729
 * @Date: 2026-09-01 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 00:00:00
 *
 * RFC 1321 MD5 (Joseph Myers, public domain)
 * 仅用于 Evp_BytesToKey 密钥派生
 */

/** 32 位无溢出加法 */
function add32(a: number, b: number): number {
  return (a + b) & 0xffffffff
}

/** MD5 单轮公共操作：加法 + 循环左移 + 模块常数 */
function cmn(q: number, a: number, b: number, x: number, s: number, t: number): number {
  a = add32(add32(a, q), add32(x, t))
  return add32((a << s) | (a >>> (32 - s)), b)
}

/** MD5 F: (B & C) | (~B & D) */
function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  return cmn((b & c) | ((~b >>> 0) & d), a, b, x, s, t)
}

/** MD5 G: (B & D) | (C & ~D) */
function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  return cmn((b & d) | (c & (~d >>> 0)), a, b, x, s, t)
}

/** MD5 H: B ^ C ^ D */
function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  return cmn(b ^ c ^ d, a, b, x, s, t)
}

/** MD5 I: C ^ (B | ~D) */
function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number): number {
  return cmn(c ^ (b | (~d >>> 0)), a, b, x, s, t)
}

/** 对一个 64 字节块执行 64 轮变换，更新状态 x */
function md5cycle(x: number[], k: number[]): void {
  let a = x[0],
    b = x[1],
    c = x[2],
    d = x[3]

  a = ff(a, b, c, d, k[0], 7, -680876936)
  d = ff(d, a, b, c, k[1], 12, -389564586)
  c = ff(c, d, a, b, k[2], 17, 606105819)
  b = ff(b, c, d, a, k[3], 22, -1044525330)
  a = ff(a, b, c, d, k[4], 7, -176418897)
  d = ff(d, a, b, c, k[5], 12, 1200080426)
  c = ff(c, d, a, b, k[6], 17, -1473231341)
  b = ff(b, c, d, a, k[7], 22, -45705983)
  a = ff(a, b, c, d, k[8], 7, 1770035416)
  d = ff(d, a, b, c, k[9], 12, -1958414417)
  c = ff(c, d, a, b, k[10], 17, -42063)
  b = ff(b, c, d, a, k[11], 22, -1990404162)
  a = ff(a, b, c, d, k[12], 7, 1804603682)
  d = ff(d, a, b, c, k[13], 12, -40341101)
  c = ff(c, d, a, b, k[14], 17, -1502002290)
  b = ff(b, c, d, a, k[15], 22, 1236535329)

  a = gg(a, b, c, d, k[1], 5, -165796510)
  d = gg(d, a, b, c, k[6], 9, -1069501632)
  c = gg(c, d, a, b, k[11], 14, 643717713)
  b = gg(b, c, d, a, k[0], 20, -373897302)
  a = gg(a, b, c, d, k[5], 5, -701558691)
  d = gg(d, a, b, c, k[10], 9, 38016083)
  c = gg(c, d, a, b, k[15], 14, -660478335)
  b = gg(b, c, d, a, k[4], 20, -405537848)
  a = gg(a, b, c, d, k[9], 5, 568446438)
  d = gg(d, a, b, c, k[14], 9, -1019803690)
  c = gg(c, d, a, b, k[3], 14, -187363961)
  b = gg(b, c, d, a, k[8], 20, 1163531501)
  a = gg(a, b, c, d, k[13], 5, -1444681467)
  d = gg(d, a, b, c, k[2], 9, -51403784)
  c = gg(c, d, a, b, k[7], 14, 1735328473)
  b = gg(b, c, d, a, k[12], 20, -1926607734)

  a = hh(a, b, c, d, k[5], 4, -378558)
  d = hh(d, a, b, c, k[8], 11, -2022574463)
  c = hh(c, d, a, b, k[11], 16, 1839030562)
  b = hh(b, c, d, a, k[14], 23, -35309556)
  a = hh(a, b, c, d, k[1], 4, -1530992060)
  d = hh(d, a, b, c, k[4], 11, 1272893353)
  c = hh(c, d, a, b, k[7], 16, -155497632)
  b = hh(b, c, d, a, k[10], 23, -1094730640)
  a = hh(a, b, c, d, k[13], 4, 681279174)
  d = hh(d, a, b, c, k[0], 11, -358537222)
  c = hh(c, d, a, b, k[3], 16, -722521979)
  b = hh(b, c, d, a, k[6], 23, 76029189)
  a = hh(a, b, c, d, k[9], 4, -640364487)
  d = hh(d, a, b, c, k[12], 11, -421815835)
  c = hh(c, d, a, b, k[15], 16, 530742520)
  b = hh(b, c, d, a, k[2], 23, -995338651)

  a = ii(a, b, c, d, k[0], 6, -198630844)
  d = ii(d, a, b, c, k[7], 10, 1126891415)
  c = ii(c, d, a, b, k[14], 15, -1416354905)
  b = ii(b, c, d, a, k[5], 21, -57434055)
  a = ii(a, b, c, d, k[12], 6, 1700485571)
  d = ii(d, a, b, c, k[3], 10, -1894986606)
  c = ii(c, d, a, b, k[10], 15, -1051523)
  b = ii(b, c, d, a, k[1], 21, -2054922799)
  a = ii(a, b, c, d, k[8], 6, 1873313359)
  d = ii(d, a, b, c, k[15], 10, -30611744)
  c = ii(c, d, a, b, k[6], 15, -1560198380)
  b = ii(b, c, d, a, k[13], 21, 1309151649)
  a = ii(a, b, c, d, k[4], 6, -145523070)
  d = ii(d, a, b, c, k[11], 10, -1120210379)
  c = ii(c, d, a, b, k[2], 15, 718787259)
  b = ii(b, c, d, a, k[9], 21, -343485551)

  x[0] = add32(a, x[0])
  x[1] = add32(b, x[1])
  x[2] = add32(c, x[2])
  x[3] = add32(d, x[3])
}

/** 将 64 字节字符串解析为 16 个 32 位小端字 */
function md5blk(s: string): number[] {
  const md5blks: number[] = []
  for (let i = 0; i < 64; i += 4) {
    md5blks[i >> 2] =
      s.charCodeAt(i) +
      (s.charCodeAt(i + 1) << 8) +
      (s.charCodeAt(i + 2) << 16) +
      (s.charCodeAt(i + 3) << 24)
  }
  return md5blks
}

/** 32 位整数转 8 字符小写十六进制字符串 */
function rhex(n: number): string {
  const hex = '0123456789abcdef'
  let s = ''
  for (let j = 0; j < 4; j++) {
    s += hex[(n >> (j * 8 + 4)) & 0x0f] + hex[(n >> (j * 8)) & 0x0f]
  }
  return s
}

/** MD5 哈希，返回 32 字符小写十六进制字符串 */
export function MD5(string: string): string {
  function md51(s: string): number[] {
    const n = s.length
    const state = [1732584193, -271733879, -1732584194, 271733878]
    let i: number

    for (i = 64; i <= n; i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)))
    }

    const tail = s.substring(i - 64)
    const M = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (i = 0; i < tail.length; i++) {
      M[i >> 2] |= tail.charCodeAt(i) << (i % 4 << 3)
    }
    M[i >> 2] |= 0x80 << (i % 4 << 3)

    if (i > 55) {
      md5cycle(state, M)
      for (let j = 0; j < 16; j++) M[j] = 0
    }

    M[14] = n * 8
    md5cycle(state, M)
    return state
  }

  const hash = md51(string)
  return hash.map(v => rhex(v)).join('')
}
