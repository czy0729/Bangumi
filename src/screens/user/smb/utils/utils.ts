/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:22:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-15 22:21:43
 */
import { desc } from '@utils'
import { DICT, DICT_ORDER } from '../ds'

/** 根据文件名匹配相关标签 */
export function matchTags(name: string): string[] {
  const tags = []
  if (!name) return tags

  DICT.forEach(item => {
    if (item.reg.test(name)) tags.push(item.val)
  })

  return tags.sort((a, b) => desc(DICT_ORDER[a] || 0, DICT_ORDER[b] || 0))
}

/** 获取文件类型 */
export function getFileMediaType(filename: any) {
  const _filename = String(filename).toLocaleLowerCase()
  if (/\.(mp4|m4v|mkv|avi|rmvb|mov|flv)$/.test(_filename)) return 'video'
  if (/\.(mp3|m4a|aac|flac|ape|wav)$/.test(_filename)) return 'music'
  if (/\.(jpg|jpeg|png|gif|bmp|webp)$/.test(_filename)) return 'pic'
  if (/\.(zip|rar|7z)$/.test(_filename)) return 'zip'
  if (/((\.bgm)|(\.bgm\.txt))$/.test(_filename)) return 'origin'
  return 'file'
}
