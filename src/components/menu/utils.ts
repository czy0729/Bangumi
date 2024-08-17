/*
 * @Author: czy0729
 * @Date: 2024-08-16 00:31:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-16 01:02:53
 */
import { STORYBOOK } from '@constants'

/** 特定平台使用特定文字替代, 以使含义更清晰 */
export function platformFix(title: string) {
  if (typeof title !== 'string') return title

  if (STORYBOOK) {
    if (title === '浏览器查看') return 'bgm.tv 查看'
    if (title === '复制链接') return '复制 bgm.tv 链接'
    if (title === '复制分享') return '复制 bgm.tv 分享'
  }

  return title
}

/** 排除重复的 string 项 */
export function removeDuplicateStrings(data: any[] | readonly any[]) {
  return [...new Set(data.filter((item: any) => typeof item === 'string'))]
}
