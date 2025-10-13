/*
 * @Author: czy0729
 * @Date: 2021-01-20 11:59:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-14 03:08:28
 */
import React from 'react'
import { Text } from '@components'
import { useObserver } from '@utils/hooks'
import { Props } from './types'

function UserLabel({ isAuthor, isFriend, isLayer, userSign, lineHeight = 14 }: Props) {
  return useObserver(() => (
    <>
      {isAuthor && (
        <Text type='main' size={10} lineHeight={lineHeight} bold>
          {' '}
          作者
        </Text>
      )}
      {isFriend && !isAuthor && (
        <Text type='warning' size={10} lineHeight={lineHeight} bold>
          {' '}
          好友
        </Text>
      )}
      {isLayer && !isAuthor && !isFriend && (
        <Text type='primary' size={10} lineHeight={lineHeight} bold>
          {' '}
          层主
        </Text>
      )}
      {!!userSign && (
        <Text type='sub' size={10} lineHeight={lineHeight}>
          {' '}
          ({userSign?.slice(1, userSign?.length - 1)})
        </Text>
      )}
    </>
  ))
}

export default UserLabel
