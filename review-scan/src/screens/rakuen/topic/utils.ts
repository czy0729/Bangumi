/*
 * @Author: czy0729
 * @Date: 2024-11-08 11:39:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-03 07:12:21
 */

/** 帖子主楼纯文本, 用于翻译 */
export function getTopicMainFloorRawText(title: string, html: string) {
  let str = ''
  if (title) str += `${title}。\n`
  str += html

  return (
    str
      .replace(/<br \/>/g, '\n')
      // 去除 HTML tag
      .replace(/<\/?[^>]*>/g, '')
  )
}
