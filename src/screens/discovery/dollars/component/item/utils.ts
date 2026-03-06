/*
 * @Author: czy0729
 * @Date: 2025-08-14 17:19:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-05 14:29:14
 */
import { HOST } from '@constants'

import type { LinkData, ResultData } from './types'

export function extractLinks(str: string): LinkData[] {
  const results: ResultData[] = []
  let imgCount = 0
  let urlCount = 0

  const pattern =
    /\[user=(\d+)\]([^\]]+)\[\/user\]|\[url=([^\]]+)\]|\[img\]([^\]]+)\[\/img\]|(https?:\/\/\S+)/g
  let match: RegExpExecArray | null

  while ((match = pattern.exec(str)) !== null) {
    const index = match.index
    if (match[1] && match[2]) {
      // [user=id]name[/user]
      results.push({
        index,
        type: 'user',
        data: {
          url: `${HOST}/user/${match[1]}`,
          text: `${match[2]}@${match[1]}`
        }
      })
    } else if (match[3]) {
      // [url=...]
      results.push({
        index,
        type: 'url',
        data: {
          url: match[3],
          text: '' // 占位，后面统一赋 URL n
        }
      })
    } else if (match[4]) {
      // [img]...[/img]
      results.push({
        index,
        type: 'img',
        data: {
          url: match[4],
          text: '' // 占位，后面统一赋 IMG n
        }
      })
    } else if (match[5]) {
      // 普通 URL
      results.push({
        index,
        type: 'url',
        data: {
          url: match[5],
          text: '' // 占位，后面统一赋 URL n
        }
      })
    }
  }

  // 排序并加编号
  return results
    .sort((a, b) => a.index - b.index)
    .map(item => {
      if (item.type === 'img') {
        imgCount++
        item.data.text = `[IMG] ${getImageNameFromUrl(item.data.url) || imgCount}`
      } else if (item.type === 'url') {
        urlCount++
        item.data.text = `[URL] ${urlCount}`
      }
      return item.data
    })
}

function getImageNameFromUrl(url: string) {
  try {
    // 处理相对路径或协议相对 URL
    const fullUrl = url.startsWith('//') ? 'https:' + url : url
    const urlObj = new URL(fullUrl)

    // 获取路径的最后一部分
    const pathname = urlObj.pathname
    const fileName = pathname.split('/').pop()

    // 如果文件名不为空，返回它
    if (fileName && fileName !== '') {
      return fileName
    }

    return null
  } catch {
    // 如果 URL 解析失败，尝试用正则提取
    const matches = url.match(/\/([^/?#]+)(?:[?#]|$)/)
    return matches ? matches[1] : null
  }
}
