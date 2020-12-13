/*
 * 自动添加好友和好友曾用名
 *
 * @Author: czy0729
 * @Date: 2020-11-26 10:16:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-14 01:10:23
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { usersStore } from '@stores'

function Name({
  size,
  lineHeight,
  userId,
  showFriend,
  right,
  children,
  ...other
}) {
  const { friendsMap = {} } = usersStore
  const isFriend = !!friendsMap[userId]
  const hasChangedName =
    isFriend &&
    friendsMap[userId]?.lastUserName &&
    friendsMap[userId]?.lastUserName?.trim() !== friendsMap[userId]?.userName?.trim()
  return (
    <Text size={size} lineHeight={lineHeight} {...other}>
      {children}
      {hasChangedName && (
        <Text type='sub' size={11} lineHeight={lineHeight || size}>
          {' '}
          ({friendsMap[userId].lastUserName})
        </Text>
      )}
      {showFriend && isFriend && (
        <Text type='warning' size={11} lineHeight={lineHeight || size}>
          {' '}
          好友
        </Text>
      )}
      {right}
    </Text>
  )
}

Name.defaultProps = {
  showFriend: false
}

export default observer(Name)
