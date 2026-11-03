/*
 * @Author: czy0729
 * @Date: 2026-11-03 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 12:00:00
 *
 * 收款码条目
 */
import type { ImageSource } from '@types'

export type QrCode = {
  /** 说明文案 */
  label: string

  /** 本地展示图 */
  src: ImageSource

  /** 长按打开的浏览器原图 */
  url: string
}
