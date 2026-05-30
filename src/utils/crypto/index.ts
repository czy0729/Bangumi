/*
 * @Author: czy0729
 * @Date: 2022-05-10 04:54:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-30 07:04:38
 */
import CryptoJS from 'crypto-js'
import { APP_ID } from '@constants/constants/app'

/** 加密字符串 */
export function set(data: object | string) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), APP_ID).toString()
}

/** 解密字符串 */
export function get<T extends object | string>(content: string): T {
  const bytes = CryptoJS.AES.decrypt(content.toString(), APP_ID)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

/** HMAC-SHA256 签名, 返回 hex 字符串 */
export function hmacSHA256(message: string, secret: string): string {
  return CryptoJS.HmacSHA256(message, secret).toString(CryptoJS.enc.Hex)
}

export default {
  set,
  get,
  hmacSHA256
}
