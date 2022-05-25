/*
 * @Author: czy0729
 * @Date: 2022-05-10 04:54:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 08:23:19
 */
import CryptoJS from 'crypto-js'
import { APP_ID } from '@constants'

/** 加密字符串 */
export function set(data: object | string) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), APP_ID).toString()
}

/** 解密字符串 */
export function get(content: string): object | string {
  const bytes = CryptoJS.AES.decrypt(content.toString(), APP_ID)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

export default {
  set,
  get
}
