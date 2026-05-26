/*
 * @Author: czy0729
 * @Date: 2026-05-25 06:58:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-27 06:00:42
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

export type VndbVnResult = {
  id: string
  length_minutes: number
  screenshots: VndbScreenshot[]
}

export type DlsiteImage = {
  url: string
}
