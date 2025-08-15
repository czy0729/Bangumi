/*
 * @Author: czy0729
 * @Date: 2025-08-14 17:19:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-14 18:24:22
 */
import { HOST } from '@constants'

type LinkData = {
  url: string
  text: string
}

export function extractLinks(str: string): LinkData[] {
  const results: {
    index: number
    data: LinkData
    type: 'user' | 'url' | 'img'
  }[] = []
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
        item.data.text = `[IMG] ${imgCount}`
      } else if (item.type === 'url') {
        urlCount++
        item.data.text = `[URL] ${urlCount}`
      }
      return item.data
    })
}
