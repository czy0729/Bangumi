/*
 * @Author: czy0729
 * @Date: 2026-06-07 05:08:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 05:24:20
 */
import React from 'react'
import { Text } from '@components'
import { copy } from '@utils'

/** 解析 [url]...[/url] 和 [url=xxx]...[/url] 标签，高亮显示文字部分 */
export function parseUrlHighlight(text: string) {
  try {
    const parts: React.ReactNode[] = []
    const regex = /\[url(?:=([^\]]*))?\](.*?)\[\/url\]/g
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      const url = match[1] || match[2]
      parts.push(
        <Text key={lastIndex} type='warning' size={10}>
          [url{match[1] ? `=${match[1]}` : ''}]
          <Text
            type='warning'
            size={10}
            onLongPress={() => {
              copy(url, `已复制 ${url}`)
            }}
          >
            {match[2]}
          </Text>
          [/url]
        </Text>
      )
      lastIndex = match.index + match[0].length
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex))
    }

    return parts.length ? parts : text
  } catch {}

  return text
}
