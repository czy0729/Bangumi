/*
 * @Author: czy0729
 * @Date: 2026-09-01 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 00:00:00
 *
 * HMAC-SHA256 implementation.
 */
import { sha256Bytes } from './sha256'
import { bytesToHex, utf8Encode } from './utf8'

const BLOCK_SIZE = 64
const HASH_SIZE = 32

/**
 * HMAC-SHA256 签名
 *
 * 全程字节流运算 (RFC 2104)：无字符串往返，ipad/opad 缓冲模块级复用。
 * @param key - 密钥 (按 UTF-8 编码)
 * @param message - 要签名的消息 (按 UTF-8 编码)
 * @returns 小写十六进制字符串
 */
export function HMACSHA256(key: string, message: string): string {
  let keyBytes = utf8Encode(key)
  if (keyBytes.length > BLOCK_SIZE) {
    keyBytes = sha256Bytes(keyBytes)
  }

  const msgBytes = utf8Encode(message)
  const ipad = new Uint8Array(BLOCK_SIZE + msgBytes.length)
  const opad = new Uint8Array(BLOCK_SIZE + HASH_SIZE)

  let i = 0
  for (; i < BLOCK_SIZE; i++) {
    const k = i < keyBytes.length ? keyBytes[i] : 0
    ipad[i] = k ^ 0x36
    opad[i] = k ^ 0x5c
  }

  ipad.set(msgBytes, BLOCK_SIZE)
  const innerHash = sha256Bytes(ipad)
  opad.set(innerHash, BLOCK_SIZE)

  return bytesToHex(sha256Bytes(opad))
}

export const hmacSHA256 = HMACSHA256
