/*
 * @Author: czy0729
 * @Date: 2026-05-25 06:58:12
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-05-25 06:58:12
 */
export type VndbScreenshot = {
  id: string
  url: string
  dims: [number, number]
  sexual: number
  violence: number
  thumbnail: string
  thumbnail_dims: [number, number]
}

export type DlsiteImage = {
  url: string
}
