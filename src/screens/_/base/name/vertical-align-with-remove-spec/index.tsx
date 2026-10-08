/*
 * @Author: czy0729
 * @Date: 2024-06-14 20:53:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-08 04:01:39
 */
import { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { memoStyles } from '../styles'
import { VerticalAlign } from '../../vertical-align'

import type { Props } from './types'

function VerticalAlignWithRemoveSpec({
  text,
  userId,
  showFriend,
  userRemark,
  right,
  size,
  lineHeight,
  bold,
  numberOfLines,
  ...other
}: Props) {
  /** 记录命中的原文与去除特殊字符后的文本, 原文变化后自动回落到当前 text */
  const [hit, setHit] = useState<{ from: string; to: string } | null>(null)
  const handleHit = useCallback(
    (removeSpecText: string) => {
      setHit({ from: text, to: removeSpecText })
    },
    [text]
  )
  const name = hit && hit.from === text ? hit.to : text

  return (
    <VerticalAlign
      {...other}
      text={text}
      size={size}
      lineHeight={lineHeight}
      bold={bold}
      numberOfLines={numberOfLines}
      onHit={handleHit}
    >
      {userRemark ? (
        <Text
          style={memoStyles().highlight}
          size={size}
          lineHeight={lineHeight}
          bold={bold}
          numberOfLines={numberOfLines}
        >
          {name}
        </Text>
      ) : (
        name
      )}
      {right}
    </VerticalAlign>
  )
}

export default observer(VerticalAlignWithRemoveSpec)
