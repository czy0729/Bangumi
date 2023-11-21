/*
 * @Author: czy0729
 * @Date: 2023-11-15 21:28:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-21 15:55:41
 */
import { findJA } from '@utils/thirdParty/ja'
import { SMBListItem } from '../types'
import { getFileMediaType, matchTags } from './utils'

/** input 选择文件夹的结果转换为 smb 一样的输入数据 */
export function transformData(
  inputData: {
    lastModified: string
    lastModifiedDate: string
    name: string
    size: number
    type: string
    webkitRelativePath: string
  }[]
) {
  const result: SMBListItem[] = []
  const map = new Map()

  inputData
    .filter(item => !item.webkitRelativePath.startsWith('.'))
    .forEach(item => {
      const match = item.webkitRelativePath.match(/bangumi-(\d+)/)
      const folderName = item.webkitRelativePath.split('/').slice(0, -1).join('/')

      if (!map.has(folderName)) {
        map.set(folderName, {
          ids: [],
          lastModified: item.lastModifiedDate,
          list: [],
          name: folderName,
          path: '',
          tags: matchTags(folderName)
        })
      }

      if (match) {
        const id = match[1]
        if (!map.get(folderName).ids.includes(id)) {
          map.get(folderName).ids.push(id)
        }
      }

      if (!map.get(folderName).ids.length) {
        const id = findJA(extractAnimeName(removeLeftText(folderName)))
        if (id) map.get(folderName).ids.push(id)
      }

      map.get(folderName).list.push({
        lastModified: item.lastModifiedDate,
        name: item.name,
        type: getFileMediaType(item.name)
      })
    })

  map.forEach(value => {
    result.push(value)
  })

  return result
}

const specReg = /s[1-9]|movies?|extras?|specials?|ova|oad|sp/g

/** 尝试匹配文件夹中条目的关键罗马音 */
export function extractAnimeName(input: string) {
  const splits = input.split('/')
  let match = splits[splits.length - 1]
    .replace(/\[.*?\]|\(.*?\)|\{.*?\}/g, '')
    .replace(/\b\d{2}-\d{2}\b/g, '')
    .replace(/_/g, ' ')
    .trim()
  if (match && match.toLowerCase().replace(specReg, '').length >= 3) {
    return match
  }

  match = splits[splits.length - 1]
  if (match && match.toLowerCase().replace(specReg, '').length >= 3) {
    return match
  }

  return `${splits[splits.length - 2] || ''}${splits[splits.length - 1]}`
}

/** 去除第一个斜杆左侧内容 */
function removeLeftText(input: string) {
  const index = input.indexOf('/')
  if (index !== -1) return input.substring(index + 1)
  return input
}
