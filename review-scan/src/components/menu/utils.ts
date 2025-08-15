/*
 * @Author: czy0729
 * @Date: 2024-08-16 00:31:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-17 12:51:52
 */
import { WEB } from '@constants'

/** 特定平台使用特定文字替代, 以使含义更清晰 */
export function platformFix(title: string) {
  if (typeof title !== 'string') return title

  if (WEB) {
    if (title === '复制链接') return '复制 bgm.tv 链接'
    if (title === '复制分享') return '复制 bgm.tv 分享'
    if (title.includes('浏览器查看')) return title.replace('浏览器查看', 'bgm.tv 查看')
    if (title.includes('浏览器打开')) return title.replace('浏览器打开', 'bgm.tv 打开')
  }

  return title
}

/** 排除重复的 string 项 */
export function removeDuplicateStrings(data: any[] | readonly any[]) {
  return [...new Set(data.filter((item: any) => typeof item === 'string'))]
}
