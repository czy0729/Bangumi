/*
 * @Author: czy0729
 * @Date: 2026-03-05 14:27:48
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-03-05 14:27:48
 */
export type LinkData = {
  url: string
  text: string
}

export type ResultData = {
  index: number
  data: LinkData
  type: 'user' | 'url' | 'img' | 'quote'
}
