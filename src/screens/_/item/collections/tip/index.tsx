/*
 * @Author: czy0729
 * @Date: 2025-01-24 06:05:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-24 12:04:45
 *
 * 简介: 按标题长度动态减少可显示行数
 */
import { observer } from 'mobx-react'
import { Text } from '@components'
import { HTMLDecode } from '@utils'

import type { Props } from './types'

function Tip({ style, name, nameCn, numberOfLines, value }: Props) {
  const titleLength = name.length + nameCn.length

  return (
    <Text
      style={style}
      size={11}
      lineHeight={12}
      numberOfLines={Math.max(2, numberOfLines - (titleLength >= 36 ? 1 : 0))}
    >
      {HTMLDecode(value)}
    </Text>
  )
}

export default observer(Tip)
