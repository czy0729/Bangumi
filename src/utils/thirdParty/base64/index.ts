/*
 * @Author: czy0729
 * @Date: 2022-08-03 08:54:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 13:36:17
 */

/** 标准字母表 (不含 '=') */
const CODE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

/** 编码查表 */
const LOOKUP: string[] = []

/** 字符串族 (atob) 解码查表; 与旧实现一致, 表外字符 (含 URL-safe 的 -、_) 静默忽略 */
const REV_LOOKUP_STRING: Record<number, number> = {}

/** 字节族 (toByteArray) 解码查表; 额外支持 URL-safe 字符 (-、_), 与 Node.js 行为一致 */
const REV_LOOKUP: Record<number, number> = {}

for (let i = 0, len = CODE.length; i < len; ++i) {
  LOOKUP[i] = CODE[i]
  REV_LOOKUP[CODE.charCodeAt(i)] = i
  REV_LOOKUP_STRING[CODE.charCodeAt(i)] = i
}
REV_LOOKUP['-'.charCodeAt(0)] = 62
REV_LOOKUP['_'.charCodeAt(0)] = 63

/**
 * Base64 字符串族 (Latin1 字符串 ↔ base64)
 * - 自研重写替代 davidchambers/Base64.js 的紧凑移植, 输出与标准 btoa/atob 一致
 * - btoa: 遇 Latin1 范围外字符抛错
 * - atob: 先去除尾部 '=', 若去除后长度除 4 余 1 则抛错; 表外字符静默忽略
 *   (与旧实现一致; 唯一边界差异: 字符串中部的 '=' 旧实现按越界索引参与解码, 现按忽略处理)
 * */
const Base64 = {
  /** 将字符串编码为 base64 */
  btoa: (input: string = '') => {
    let output = ''
    let block = 0
    let size = 0

    for (let i = 0; i < input.length; i++) {
      const charCode = input.charCodeAt(i)

      if (charCode > 0xff) {
        throw new Error(
          "'btoa' failed: The string to be encoded contains characters outside of the Latin1 range."
        )
      }

      block = (block << 8) | charCode
      size += 1

      if (size === 3) {
        output += tripletToBase64(block)
        block = 0
        size = 0
      }
    }

    // 尾部不足 3 字节以 '=' 补齐
    if (size === 1) {
      output += LOOKUP[block >> 2] + LOOKUP[(block << 4) & 0x3f] + '=='
    } else if (size === 2) {
      output +=
        LOOKUP[block >> 10] + LOOKUP[(block >> 4) & 0x3f] + LOOKUP[(block << 2) & 0x3f] + '='
    }

    return output
  },

  /** 将 base64 编码的字符串解码为原始数据 */
  atob: (input: string = '') => {
    const str = input.replace(/=+$/, '')

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.")
    }

    let output = ''
    let block = 0
    let bits = 0

    for (let i = 0; i < str.length; i++) {
      const idx = REV_LOOKUP_STRING[str.charCodeAt(i)]
      if (idx === undefined) continue

      block = (block << 6) | idx
      bits += 6

      if (bits >= 8) {
        bits -= 8
        output += String.fromCharCode((block >> bits) & 0xff)
      }
    }

    return output
  }
}

export default Base64

/** 返回 [有效字符长度, 占位符 '=' 长度] */
function getLens(b64: string): [number, number] {
  const len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  let validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  const placeHoldersLen = validLen === len ? 0 : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

function _byteLength(validLen: number, placeHoldersLen: number) {
  return ((validLen + placeHoldersLen) * 3) / 4 - placeHoldersLen
}

/**
 * base64 字符串 → Uint8Array (对齐上游 base64-js.toByteArray)
 * - 支持 URL-safe 字符 (-、_) 与 '=' 占位符
 * - 非法长度 (非 4 的倍数) 抛错
 * */
export function toByteArray(b64: string): Uint8Array {
  let tmp: number
  const lens = getLens(b64)
  const validLen = lens[0]
  const placeHoldersLen = lens[1]

  const arr = new Uint8Array(_byteLength(validLen, placeHoldersLen))

  let curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  const len = placeHoldersLen > 0 ? validLen - 4 : validLen

  let i: number
  for (i = 0; i < len; i += 4) {
    tmp =
      (REV_LOOKUP[b64.charCodeAt(i)] << 18) |
      (REV_LOOKUP[b64.charCodeAt(i + 1)] << 12) |
      (REV_LOOKUP[b64.charCodeAt(i + 2)] << 6) |
      REV_LOOKUP[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xff
    arr[curByte++] = (tmp >> 8) & 0xff
    arr[curByte++] = tmp & 0xff
  }

  if (placeHoldersLen === 2) {
    tmp = (REV_LOOKUP[b64.charCodeAt(i)] << 2) | (REV_LOOKUP[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xff
  }

  if (placeHoldersLen === 1) {
    tmp =
      (REV_LOOKUP[b64.charCodeAt(i)] << 10) |
      (REV_LOOKUP[b64.charCodeAt(i + 1)] << 4) |
      (REV_LOOKUP[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xff
    arr[curByte++] = tmp & 0xff
  }

  return arr
}

function tripletToBase64(num: number) {
  return (
    LOOKUP[(num >> 18) & 0x3f] +
    LOOKUP[(num >> 12) & 0x3f] +
    LOOKUP[(num >> 6) & 0x3f] +
    LOOKUP[num & 0x3f]
  )
}

function encodeChunk(uint8: Uint8Array, start: number, end: number) {
  let tmp: number
  const output = []
  for (let i = start; i < end; i += 3) {
    tmp = ((uint8[i] << 16) & 0xff0000) + ((uint8[i + 1] << 8) & 0xff00) + (uint8[i + 2] & 0xff)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

/**
 * Uint8Array → base64 字符串 (对齐上游 base64-js.fromByteArray)
 * - 尾部不足 3 字节以 '=' 补齐
 * */
export function fromByteArray(uint8: Uint8Array): string {
  let tmp: number
  const len = uint8.length
  const extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  const parts = []
  const maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (let i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(LOOKUP[tmp >> 2] + LOOKUP[(tmp << 4) & 0x3f] + '==')
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(LOOKUP[tmp >> 10] + LOOKUP[(tmp >> 4) & 0x3f] + LOOKUP[(tmp << 2) & 0x3f] + '=')
  }

  return parts.join('')
}
