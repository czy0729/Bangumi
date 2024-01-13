/*
 * @Author: czy0729
 * @Date: 2020-11-26 10:16:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:33:10
 */
import React, { useCallback, useState } from 'react'
import { Component, Text } from '@components'
import { usersStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { Props as NameProps } from './types'

export { NameProps }

/** 自动添加好友和好友曾用名 */
export const Name = ({
  style,
  size,
  lineHeight,
  userId,
  showFriend = false,
  right,
  numberOfLines = 1,
  disabled,
  children,
  ...other
}: NameProps) => {
  r(COMPONENT)

  const [lines, setLines] = useState(numberOfLines)
  const setLines2 = useCallback(() => setLines(numberOfLines + 1), [numberOfLines])

  const { friendsMap = {} } = usersStore
  const isFriend = !!friendsMap[userId]
  const hasChangedName =
    isFriend &&
    friendsMap[userId]?.lastUserName &&
    friendsMap[userId]?.lastUserName?.trim() !== friendsMap[userId]?.userName?.trim()

  return useObserver(() => (
    <Component id='base-name'>
      <Text
        size={size}
        lineHeight={lineHeight}
        numberOfLines={lines}
        onPress={disabled ? undefined : setLines2}
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
    </Component>
  ))
}
