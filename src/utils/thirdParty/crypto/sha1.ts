/*
 * @Author: czy0729
 * @Date: 2026-09-01 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 00:00:00
 */
import { bytesToHex, utf8Encode } from './utf8'

const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6]

// 模块级复用, 避免每次调用分配 (单线程无重入)
const W = new Int32Array(80)

/**
 * SHA1 哈希，返回 40 字符小写十六进制字符串
 * @param message - 待哈希字符串 (按 UTF-8 编码)
 * @returns 40 字符小写 hex
 */
export function SHA1(message: string): string {
  const msg = utf8Encode(message)
  const bitLen = msg.length * 8
  const msgLen = msg.length

  // 0x80 + 补零至 ≡56 (mod 64) + 64 位大端比特长度 (本场景长度高 32 位恒为 0)
  const paddedLen = msgLen + 9 <= 64 ? 64 : ((msgLen + 9 + 63) >> 6) << 6
  const padded = new Uint8Array(paddedLen)
  padded.set(msg)
  padded[msgLen] = 0x80
  padded[paddedLen - 4] = (bitLen >>> 24) & 0xff
  padded[paddedLen - 3] = (bitLen >>> 16) & 0xff
  padded[paddedLen - 2] = (bitLen >>> 8) & 0xff
  padded[paddedLen - 1] = bitLen & 0xff

  let h0 = 0x67452301
  let h1 = 0xefcdab89
  let h2 = 0x98badcfe
  let h3 = 0x10325476
  let h4 = 0xc3d2e1f0

  for (let block = 0; block < paddedLen; block += 64) {
    for (let t = 0; t < 16; t++) {
      const i = block + t * 4
      W[t] = (padded[i] << 24) | (padded[i + 1] << 16) | (padded[i + 2] << 8) | padded[i + 3]
    }
    for (let t = 16; t < 80; t++) {
      const x = W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16]
      W[t] = (x << 1) | (x >>> 31)
    }

    let a = h0
    let b = h1
    let c = h2
    let d = h3
    let e = h4

    for (let t = 0; t < 80; t++) {
      let f: number
      let k: number
      if (t < 20) {
        f = (b & c) | (~b & d)
        k = K[0]
      } else if (t < 40) {
        f = b ^ c ^ d
        k = K[1]
      } else if (t < 60) {
        f = (b & c) | (b & d) | (c & d)
        k = K[2]
      } else {
        f = b ^ c ^ d
        k = K[3]
      }
      const a5 = (a << 5) | (a >>> 27)
      const temp = (a5 + f + e + k + W[t]) | 0
      e = d
      d = c
      c = (b << 30) | (b >>> 2)
      b = a
      a = temp
    }

    h0 = (h0 + a) | 0
    h1 = (h1 + b) | 0
    h2 = (h2 + c) | 0
    h3 = (h3 + d) | 0
    h4 = (h4 + e) | 0
  }

  const out = new Uint8Array(20)
  const hs = [h0, h1, h2, h3, h4]
  for (let i = 0; i < 5; i++) {
    out[i * 4] = (hs[i] >>> 24) & 0xff
    out[i * 4 + 1] = (hs[i] >>> 16) & 0xff
    out[i * 4 + 2] = (hs[i] >>> 8) & 0xff
    out[i * 4 + 3] = hs[i] & 0xff
  }
  return bytesToHex(out)
}
