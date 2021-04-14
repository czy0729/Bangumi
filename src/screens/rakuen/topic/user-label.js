/*
 * @Author: czy0729
 * @Date: 2021-01-20 11:59:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-20 15:29:53
 */
import React from 'react'
import { Text } from '@components'
import { ob } from '@utils/decorators'

function UserLabel({ isAuthor, isFriend, isLayer, userSign }) {
  return (
    <>
      {isAuthor && (
        <Text type='main' size={10} lineHeight={14} bold>
          {' '}
          作者
        </Text>
      )}
      {isFriend && !isAuthor && (
        <Text type='warning' size={10} lineHeight={14} bold>
          {' '}
          好友
        </Text>
      )}
      {isLayer && !isAuthor && !isFriend && (
        <Text type='primary' size={10} lineHeight={14} bold>
          {' '}
          层主
        </Text>
      )}
      {!!userSign && (
        <Text type='sub' size={10} lineHeight={14}>
          {' '}
          ({userSign.slice(1, userSign.length - 1)})
        </Text>
      )}
    </>
  )
}

export default ob(UserLabel)
