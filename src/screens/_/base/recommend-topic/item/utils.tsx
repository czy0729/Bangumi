/*
 * @Author: czy0729
 * @Date: 2026-06-07 05:08:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 05:24:20
 */
import React from 'react'
import { Text } from '@components'
import { _ } from '@stores'
import { copy } from '@utils'

import type { TextProps } from '@components'

/** 解析 [url]...[/url] 和 [url=xxx]...[/url] 标签，高亮显示文字部分 */
export function parseUrlHighlight(text: string) {
  try {
    const parts: React.ReactNode[] = []
    const regex = /\[url(?:=([^\]]*))?\](.*?)\[\/url\]/g
    let lastIndex = 0
    let match: RegExpExecArray | null

    const textProps: TextProps = {
      type: _.select('main', 'warning'),
      size: 10,
      lineHeight: 12,
      bold: true
    } as const

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index))
      }
      const url = match[1] || match[2]
      const cb = () => copy(url, `已复制 ${url}`)

      parts.push(
        <Text key={lastIndex} {...textProps}>
          [url{match[1] ? `=${match[1]}` : ''}]
          <Text {...textProps} onPress={cb} onLongPress={cb}>
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
