/*
 * @Author: czy0729
 * @Date: 2020-11-26 10:16:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-10 12:32:17
 */
import React, { useCallback, useState } from 'react'
import { Component, Text } from '@components'
import { systemStore, usersStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as NameProps } from './types'

export { NameProps }

/** 自动添加好友和好友曾用名 */
export const Name = ({
  style,
  size,
  lineHeight,
  bold,
  numberOfLines = 1,
  userId,
  showFriend = false,
  right,
  disabled,
  children,
  ...other
}: NameProps) => {
  r(COMPONENT)

  const [lines, setLines] = useState(numberOfLines)
  const setLines2 = useCallback(() => setLines(numberOfLines + 1), [numberOfLines])
  const textLineHeight = lineHeight || size

  // 已失效, 待修复历史名称逻辑
  // const hasChangedName =
  //   isFriend &&
  //   friendsMap[userId]?.lastUserName &&
  //   friendsMap[userId]?.lastUserName?.trim() !== friendsMap[userId]?.userName?.trim()

  return useObserver(() => {
    let userRemark: string
    if (userId) userRemark = systemStore.userRemark(userId)

    return (
      <Component id='base-name'>
        <Text
          style={style}
          size={size}
          lineHeight={textLineHeight}
          bold={bold}
          numberOfLines={lines}
          onPress={disabled ? undefined : setLines2}
          {...other}
        >
          {userRemark ? (
            <Text
              style={memoStyles().highlight}
              size={size}
              lineHeight={textLineHeight}
              bold={bold}
              numberOfLines={lines}
            >
              {userRemark}
            </Text>
          ) : (
            children
          )}
          {/* {hasChangedName && (
            <Text type='sub' size={11} lineHeight={textLineHeight}>
              ({friendsMap[userId].lastUserName}){' '}
            </Text>
          )} */}
          {showFriend && !!usersStore.myFriendsMap[userId] && (
            <Text type='warning' size={11} lineHeight={textLineHeight}>
              {' '}
              好友
            </Text>
          )}
          {right}
        </Text>
      </Component>
    )
  })
}
