/*
 * @Author: czy0729
 * @Date: 2024-06-14 20:53:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 17:47:20
 */
import React, { useCallback, useState } from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
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
