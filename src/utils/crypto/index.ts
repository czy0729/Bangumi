/*
 * @Author: czy0729
 * @Date: 2022-05-10 04:54:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-03 23:28:24
 */
import { APP_ID } from '@constants/app'
import { decrypt, encrypt } from './aes'
import { HMACSHA256 } from './hmac-sha256'
import { SHA1 } from './sha1'

export { SHA1, encrypt, decrypt }

/** 加密字符串 */
export function set(data: object | string) {
  return encrypt(JSON.stringify(data), APP_ID)
}

/** 解密字符串 */
export function get<T extends object | string>(content: string): T {
  const plaintext = decrypt(content.toString(), APP_ID)
  return JSON.parse(plaintext) as T
}

/** HMAC-SHA256 签名, 返回 hex 字符串 */
export function hmacSHA256(message: string, secret: string): string {
  return HMACSHA256(secret, message)
}

export default {
  set,
  get,
  hmacSHA256
}
