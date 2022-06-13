/*
 * 自动添加好友和好友曾用名
 *
 * @Author: czy0729
 * @Date: 2020-11-26 10:16:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-13 12:51:48
 */
import React, { useState, useCallback } from 'react'
import { Text } from '@components'
import { usersStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { Props as NameProps } from './types'

export { NameProps }

export const Name = ({
  style,
  size,
  lineHeight,
  userId,
  showFriend = false,
  right,
  numberOfLines = 1,
  children,
  ...other
}: NameProps) => {
  const [lines, setLines] = useState(numberOfLines)
  const setLines2 = useCallback(() => setLines(numberOfLines + 1), [numberOfLines])

  const { friendsMap = {} } = usersStore
  const isFriend = !!friendsMap[userId]
  const hasChangedName =
    isFriend &&
    friendsMap[userId]?.lastUserName &&
    friendsMap[userId]?.lastUserName?.trim() !== friendsMap[userId]?.userName?.trim()

  return useObserver(() => (
    <Text
      size={size}
      lineHeight={lineHeight}
      numberOfLines={lines}
      onPress={setLines2}
      {...other}
    >
      {children}
      {hasChangedName && (
        <Text type='sub' size={11} lineHeight={lineHeight || size}>
          ({friendsMap[userId].lastUserName}){' '}
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
  ))
}
