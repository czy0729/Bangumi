/*
 * @Author: czy0729
 * @Date: 2023-09-23 05:22:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 00:02:52
 */
import { Linking } from 'react-native'
import { desc } from '@utils'
import { isWindows } from '@utils/dom'
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
  if (/\.(zip|rar|7z)(\.\d+)?$/.test(_filename)) return 'zip'
  if (/((\.bgm)|(\.bgm\.txt))$/.test(_filename)) return 'origin'
  return 'file'
}

/** 格式化文件大小 */
export function formatFileSize(size: number) {
  if (!size || typeof size !== 'number') return ''

  if (size >= 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`
  }

  if (size >= 1024 * 1024) {
    return `${Math.floor(size / (1024 * 1024))} MB`
  }

  return `${Math.floor(size / 1024)} KB`
}

/** 根据平台信息修正链接 */
export function fixedUrl(link: string) {
  if (!isWindows()) return link

  return String(link).replace(/\//g, '\\').replace(/:\\\\/g, '://')
}

/** @todo 带异常处理的打开链接 */
export function openURL(url: string) {
  Linking.openURL(url)
}
