/*
 * @Author: czy0729
 * @Date: 2026-09-02 13:36:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 13:36:23
 */
import Base64, { fromByteArray, toByteArray } from '../index'

/** 与差分脚本一致的确定性伪随机 (Lehmer RNG), 保证冻结期望值可复现 */
function lcgBytes(seed: number, len: number): Uint8Array {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  const arr = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    s = (s * 16807) % 2147483647
    arr[i] = s & 0xff
  }
  return arr
}

/** FNV-1a 32bit, 用于钉住大 buffer 的差分结果 */
function fnv1a(str: string): number {
  let h = 0x811c9dc5
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = (h + ((h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24))) >>> 0
  }
  return h >>> 0
}

/** RFC 4648 测试向量 */
const RFC_VECTORS: [string, string][] = [
  ['', ''],
  ['f', 'Zg=='],
  ['fo', 'Zm8='],
  ['foo', 'Zm9v'],
  ['foob', 'Zm9vYg=='],
  ['fooba', 'Zm9vYmE='],
  ['foobar', 'Zm9vYmFy']
]

/** 上游 beatgammit/base64-js@1.5.1 差分冻结的编码期望值 (源字节数, 期望 base64) */
const ENCODE_CASES: [number, string][] = [
  [0, ''],
  [1, 'Tg=='],
  [2, '9dM='],
  [3, 'nMRn'],
  [4, 'Q7VA1A=='],
  [5, '6qYa/g8='],
  [6, 'kZf0KZF5'],
  [7, 'OInOUxRBwA=='],
  [8, '33qnfpYJmPQ='],
  [15, 'cBKcpyiDgOo63oZYzSAw'],
  [16, 'FwN10atLWOl+LB6tWgLjwA=='],
  [17, 'vvRP/C0TMOjCerYD5uSWB6o='],
  [63, 'wEhwnaIOA6vrexhhNYLD4epAGATaa2V7NmHFqRrserAQw69V6HD/V88+bjBpRCj4kVtxXg8RFoofObrDuaBh'],
  [64, 'ZzlKxyTW26ovybC2wmR2KQJRsFgKfZOBj1cwgKP0FENZ9hGW3H4jPC9vP/hXpTVEk5Gq4JPJKyy77hUq5GpGXA=='],
  [65, 'Dioj8qees6hyF0kMTkYpcBpiSaw5j8CH50ycVyv8rtahKXTXz4tHIo6gEcFFBkGQlcbkYReCP85Yo3CRDzUspVM='],
  [
    100,
    '4yLpwH/+PHqzvx69jy2kOFa1Hiq1+vxWDd5AsNIJuOaCI/TGHm0zfZNTvTTCTPvw5RXKFSyzCPq9Xt2p7eSNiFDqL3mzUKR/Qr2yPNKN0UaSQoJeYB7nPUv7sw0YXdv75Rl5IQ=='
  ]
]

/** 大 buffer 差分以校验和 + 长度钉死 (原文过长不内联) */
const CHECKSUM_CASES: [number, number, number][] = [
  // [源字节数, 期望 base64 的 FNV-1a, 期望长度]
  [255, 2408552537, 340],
  [256, 481720311, 344],
  [1023, 3091567285, 1364],
  [16383, 218695699, 21844],
  [16384, 3388741493, 21848],
  [65536, 1302314204, 87384]
]

/** 上游差分冻结的解码期望值 */
const DECODE_CASES: [string, number[]][] = [
  ['Zg==', [102]],
  ['Zm8=', [102, 111]],
  ['Zm9v', [102, 111, 111]],
  ['Zm9vYg==', [102, 111, 111, 98]],
  ['Zm9vYmE=', [102, 111, 111, 98, 97]],
  ['Zm9vYmFy', [102, 111, 111, 98, 97, 114]],
  ['QQ==', [65]],
  ['YWJj', [97, 98, 99]]
]

describe('base64 (toByteArray / fromByteArray)', () => {
  it('RFC 4648 标准向量双向一致', () => {
    RFC_VECTORS.forEach(([text, b64]) => {
      const bytes = new Uint8Array(Array.from(text).map(c => c.charCodeAt(0)))
      expect(fromByteArray(bytes)).toBe(b64)
      expect(Array.from(toByteArray(b64))).toEqual(Array.from(bytes))
    })
  })

  it('编码差分冻结用例 (长度 0~100)', () => {
    ENCODE_CASES.forEach(([len, expected]) => {
      expect(fromByteArray(lcgBytes(len + 1, len))).toBe(expected)
    })
  })

  it('[分块边界] 大 buffer 差分校验和与长度一致 (含 16383/16384 分块边界)', () => {
    CHECKSUM_CASES.forEach(([len, expectedFnv, expectedLen]) => {
      const result = fromByteArray(lcgBytes(len + 1, len))
      expect(result.length).toBe(expectedLen)
      expect(fnv1a(result)).toBe(expectedFnv)
    })
  })

  it('大 buffer 往返一致', () => {
    CHECKSUM_CASES.forEach(([len]) => {
      const bytes = lcgBytes(len + 1, len)
      expect(toByteArray(fromByteArray(bytes))).toEqual(bytes)
    })
  })

  it('解码差分冻结用例', () => {
    DECODE_CASES.forEach(([b64, expected]) => {
      expect(Array.from(toByteArray(b64))).toEqual(expected)
    })
  })

  it('支持 URL-safe 字符 (-、_)', () => {
    expect(Array.from(toByteArray('A-_9'))).toEqual([3, 239, 253])
    expect(Array.from(toByteArray('A--9'))).toEqual([3, 239, 189])
  })

  it('非法长度 (非 4 的倍数) 抛错', () => {
    ;['Z', 'Zm9', 'Zm9vY', '-_8'].forEach(b64 => {
      expect(() => toByteArray(b64)).toThrow('Invalid string. Length must be a multiple of 4')
    })
  })

  it('空输入', () => {
    expect(fromByteArray(new Uint8Array(0))).toBe('')
    expect(Array.from(toByteArray(''))).toEqual([])
  })
})

/** 字符串族编码差分冻结用例 (与 Node 原生 btoa 对拍, Latin1 源串) */
const STRING_ENCODE_CASES: [number, string][] = [
  [0, ''],
  [1, 'Tg=='],
  [2, '9dM='],
  [3, 'nMRn'],
  [4, 'Q7VA1A=='],
  [5, '6qYa/g8='],
  [6, 'kZf0KZF5'],
  [7, 'OInOUxRBwA=='],
  [8, '33qnfpYJmPQ='],
  [15, 'cBKcpyiDgOo63oZYzSAw'],
  [16, 'FwN10atLWOl+LB6tWgLjwA=='],
  [17, 'vvRP/C0TMOjCerYD5uSWB6o='],
  [
    100,
    '4yLpwH/+PHqzvx69jy2kOFa1Hiq1+vxWDd5AsNIJuOaCI/TGHm0zfZNTvTTCTPvw5RXKFSyzCPq9Xt2p7eSNiFDqL3mzUKR/Qr2yPNKN0UaSQoJeYB7nPUv7sw0YXdv75Rl5IQ=='
  ]
]

describe('base64 (btoa / atob 字符串族)', () => {
  it('btoa RFC 4648 标准向量', () => {
    RFC_VECTORS.forEach(([text, b64]) => {
      expect(Base64.btoa(text)).toBe(b64)
    })
  })

  it('btoa 与 Node 原生差分冻结用例 (长度 0~100)', () => {
    STRING_ENCODE_CASES.forEach(([len, expected]) => {
      const str = Array.from(lcgBytes(len + 1, len))
        .map(b => String.fromCharCode(b))
        .join('')
      expect(Base64.btoa(str)).toBe(expected)
    })
  })

  it('btoa 遇 Latin1 范围外字符抛错', () => {
    expect(() => Base64.btoa('测')).toThrow(
      "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
    )
  })

  it('atob RFC 4648 标准向量', () => {
    RFC_VECTORS.forEach(([text, b64]) => {
      expect(Base64.atob(b64)).toBe(text)
    })
  })

  it('[怪癖] atob 静默忽略表外字符, 与旧实现一致', () => {
    expect(Base64.atob(' Zm9v ')).toBe('foo')
    expect(Base64.atob('Z-m-9-v-')).toBe('foo')
  })

  it('[边界] 表外字符不豁免长度校验 (去尾部 = 后余 1 仍抛错), 与旧实现一致', () => {
    expect(() => Base64.atob('Zm9v-')).toThrow(
      "'atob' failed: The string to be decoded is not correctly encoded."
    )
  })

  it('atob 去尾部 = 后长度除 4 余 1 抛错', () => {
    expect(() => Base64.atob('Z')).toThrow(
      "'atob' failed: The string to be decoded is not correctly encoded."
    )
    expect(() => Base64.atob('Zm9vY')).toThrow()
  })

  it('btoa/atob 往返一致', () => {
    STRING_ENCODE_CASES.forEach(([len]) => {
      const str = Array.from(lcgBytes(len + 1, len))
        .map(b => String.fromCharCode(b))
        .join('')
      expect(Base64.atob(Base64.btoa(str))).toBe(str)
    })
  })
})
