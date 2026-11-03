/*
 * @Author: czy0729
 * @Date: 2026-11-03 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 12:00:00
 *
 * 收款码: 本地图片用于展示, 长按可打开浏览器原图
 */
import type { ImageSource } from '@types'
import type { QrCode } from './types'

/** 展示宽度 */
export const QR_WIDTH = 272

/** 展示高度 */
export const QR_HEIGHT = 267

export const QR_CODES: QrCode[] = [
  {
    label: '支付宝 · 长按可使用浏览器打开',
    src: require('@assets/images/qr/alipay.jpg') as ImageSource,
    url: 'https://lsky.ry.mk/i/2026/05/15/13bfe904b76d7.webp'
  },
  {
    label: '微信 · 感谢你能看到最后',
    src: require('@assets/images/qr/wx.jpg') as ImageSource,
    url: 'https://lsky.ry.mk/i/2026/05/15/3c098ee47ec1c.webp'
  }
]
