/*
 * @Author: czy0729
 * @Date: 2024-06-14 20:53:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 11:38:34
 */
import React, { useCallback, useState } from 'react'
import { Text } from '@components'
import { useObserver } from '@utils/hooks'
import { memoStyles } from '../styles'
import { VerticalAlign } from '../../vertical-align'

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
}) {
  const [name, setName] = useState(text)
  const handleHit = useCallback(
    (removeSpecText: string) => {
      setName(removeSpecText)
    },
    [setName]
  )

  return useObserver(() => (
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
  ))
}

export default VerticalAlignWithRemoveSpec
