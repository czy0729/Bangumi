/*
 * @Author: czy0729
 * @Date: 2024-11-08 11:39:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 11:39:57
 */
/** 帖子主楼纯文本, 用于翻译 */
export function getTopicMainFloorRawText(title: string, html: string) {
  return (
    String(`${title}\n${html}`)
      .replace(/<br \/>/g, '\n')
      // 去除 HTML tag
      .replace(/<\/?[^>]*>/g, '')
  )
}
