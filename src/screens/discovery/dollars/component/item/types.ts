/*
 * @Author: czy0729
 * @Date: 2026-03-05 14:27:48
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-03-05 14:27:48
 *
 * 留言内容链接提取类型
 */
export type LinkData = {
  /** 链接地址 */
  url: string

  /** 展示文本 */
  text: string
}

export type LinkResult = {
  /** 在原文中的位置 */
  index: number

  /** 提取出的链接 */
  data: LinkData

  /** 匹配到的形态 */
  type: 'user' | 'url' | 'img' | 'quote'
}
