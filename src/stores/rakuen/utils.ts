/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:27:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-08 22:19:31
 */
import { TopicId } from '@types'

export function getInt(topicId: TopicId) {
  const str = String(topicId)
  return Number(str.slice(str.length - 2, str.length)) || 0
}

export function getBlogItemTime(str: string) {
  try {
    const temps = str
      .split('·')
      .map(item => item.trim())
      .filter(Boolean)
    if (temps.length) return temps[temps.length - 1]
  } catch (error) {}
  return ''
}

export function getBlogTime(str: string) {
  return str
    .split('·')
    .map(item => item.trim())
    .filter(Boolean)
    .filter(item => item !== '删除' && item !== '编辑')
    .join(' · ')
}
