/*
 * @Author: czy0729
 * @Date: 2026-06-17
 */
import { HTMLDecode } from '@utils'

import type { TinygrailRedPacketLogItem } from '@stores/tinygrail/types'

/** 解析红包记录描述 */
export function parseDescription(item: TinygrailRedPacketLogItem) {
  const decoded = HTMLDecode(item.description)
  const match = decoded.match(/「([^」]+)」/)
  if (!match) {
    return {
      type: 'plain',
      text: decoded
    } as const
  }

  const parts = decoded.split(/「[^」]+」/)
  const userName = match[1]
  return {
    type: 'link',
    prefix: parts[0],
    userName,
    suffix: parts[1],
    relatedName: item.relatedName
  } as const
}
