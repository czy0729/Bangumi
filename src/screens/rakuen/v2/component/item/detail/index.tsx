/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:23:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-15 03:25:02
 */
import React, { useCallback, useState } from 'react'
import { Text } from '@components'
import { Name, VerticalAlign } from '@_'
import { _ } from '@stores'
import { correctAgo } from '@utils'
import { useObserver } from '@utils/hooks'

function Detail({ time, groupCn, userName, userId }) {
  const [name, setName] = useState(userName)
  const handleHit = useCallback(
    (removeSpecText: string) => {
      setName(removeSpecText)
    },
    [setName]
  )

  return useObserver(() => (
    <VerticalAlign
      text={userName}
      style={_.mt.xs}
      size={11}
      lineHeight={13}
      numberOfLines={1}
      onHit={handleHit}
    >
      <Text type='sub' size={11} lineHeight={13}>
        {time ? correctAgo(time) : ''}
        {groupCn && time ? ' / ' : ''}
      </Text>
      <Text type='sub' size={11} lineHeight={13}>
        {groupCn}
      </Text>
      {!!name && (
        <>
          <Text type='sub' size={11} lineHeight={13}>
            {' '}
            /{' '}
          </Text>
          <Name type='sub' size={11} lineHeight={13} userId={userId} showFriend disabled>
            {name}
          </Name>
        </>
      )}
    </VerticalAlign>
  ))
}

export default Detail
