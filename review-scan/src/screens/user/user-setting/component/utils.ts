/*
 * @Author: czy0729
 * @Date: 2024-01-22 12:25:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-22 13:23:29
 */
import { HOST_AC } from '@constants'

export function getHeaders(src: string) {
  if (typeof src !== 'string' || !src.includes('hdslb.com')) {
    return {
      Referer: ''
    }
  }

  return {
    Referer: `${HOST_AC}/`
  }
}
