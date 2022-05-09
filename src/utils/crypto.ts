/*
 * @Author: czy0729
 * @Date: 2022-05-10 04:54:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-10 05:15:54
 */
import CryptoJS from 'crypto-js'
import { APP_ID } from '@constants'

export function set(data: object | string) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), APP_ID).toString()
}

export function get(content: string): object | string {
  const bytes = CryptoJS.AES.decrypt(content.toString(), APP_ID)
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
}

export default {
  set,
  get
}
