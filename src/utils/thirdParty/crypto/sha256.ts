/*
 * @Author: czy0729
 * @Date: 2026-09-01 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 00:00:00
 *
 * SHA-256 hash implementation.
 */
import { bytesToHex, utf8Encode } from './utf8'

const K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
]

// 模块级复用, 避免每次调用分配 (单线程无重入)
const W = new Int32Array(64)

/**
 * SHA-256 哈希算法 (字节流核心)
 * @param data - 待哈希字节
 * @returns 32 字节哈希
 */
export function sha256Bytes(data: Uint8Array): Uint8Array {
  const bitLen = data.length * 8
  const dataLen = data.length

  const paddedLen = ((dataLen + 9 + 63) >> 6) << 6
  const msg = new Uint8Array(paddedLen)
  msg.set(data)
  msg[dataLen] = 0x80
  msg[paddedLen - 4] = (bitLen >>> 24) & 0xff
  msg[paddedLen - 3] = (bitLen >>> 16) & 0xff
  msg[paddedLen - 2] = (bitLen >>> 8) & 0xff
  msg[paddedLen - 1] = bitLen & 0xff

  const H = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ]

  for (let off = 0; off < paddedLen; off += 64) {
    for (let t = 0; t < 16; t++) {
      const i = off + t * 4
      W[t] = (msg[i] << 24) | (msg[i + 1] << 16) | (msg[i + 2] << 8) | msg[i + 3]
    }
    for (let t = 16; t < 64; t++) {
      const w15 = W[t - 15]
      const w2 = W[t - 2]
      const s0 = ((w15 >>> 7) | (w15 << 25)) ^ ((w15 >>> 18) | (w15 << 14)) ^ (w15 >>> 3)
      const s1 = ((w2 >>> 17) | (w2 << 15)) ^ ((w2 >>> 19) | (w2 << 13)) ^ (w2 >>> 10)
      W[t] = (s1 + W[t - 7] + s0 + W[t - 16]) | 0
    }

    let a = H[0]
    let b = H[1]
    let c = H[2]
    let d = H[3]
    let e = H[4]
    let f = H[5]
    let g = H[6]
    let h = H[7]

    for (let t = 0; t < 64; t++) {
      const S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7))
      const ch = (e & f) ^ (~e & g)
      const T1 = (h + S1 + ch + K[t] + W[t]) | 0
      const S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10))
      const maj = (a & b) ^ (a & c) ^ (b & c)
      const T2 = (S0 + maj) | 0
      h = g
      g = f
      f = e
      e = (d + T1) | 0
      d = c
      c = b
      b = a
      a = (T1 + T2) | 0
    }

    H[0] = (H[0] + a) | 0
    H[1] = (H[1] + b) | 0
    H[2] = (H[2] + c) | 0
    H[3] = (H[3] + d) | 0
    H[4] = (H[4] + e) | 0
    H[5] = (H[5] + f) | 0
    H[6] = (H[6] + g) | 0
    H[7] = (H[7] + h) | 0
  }

  const out = new Uint8Array(32)
  for (let i = 0; i < 8; i++) {
    out[i * 4] = (H[i] >>> 24) & 0xff
    out[i * 4 + 1] = (H[i] >>> 16) & 0xff
    out[i * 4 + 2] = (H[i] >>> 8) & 0xff
    out[i * 4 + 3] = H[i] & 0xff
  }
  return out
}

/**
 * SHA-256 哈希算法
 * @param message - 待哈希字符串 (按 UTF-8 编码)
 * @returns 64 字符小写 hex
 */
export function SHA256(message: string): string {
  return bytesToHex(sha256Bytes(utf8Encode(message)))
}
