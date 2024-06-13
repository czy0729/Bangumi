/*
 * @Author: czy0729
 * @Date: 2020-11-26 10:16:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-14 01:00:26
 */
import React, { useCallback, useState } from 'react'
import { Component, Text } from '@components'
import { systemStore, usersStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { VerticalAlign } from '../vertical-align'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as NameProps } from './types'

export { NameProps }

/** 自动添加好友和打标签 */
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

  return useObserver(() => {
    let userRemark: string
    if (userId) userRemark = systemStore.userRemark(userId)

    return (
      <Component id='base-name'>
        <VerticalAlign
          style={style}
          size={size}
          lineHeight={textLineHeight}
          bold={bold}
          numberOfLines={lines}
          onPress={disabled ? undefined : setLines2}
          {...other}
          text={typeof children === 'string' ? children : undefined}
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
          {showFriend && !!usersStore.myFriendsMap[userId] && (
            <Text type='warning' size={11} lineHeight={textLineHeight}>
              {' '}
              好友
            </Text>
          )}
          {right}
        </VerticalAlign>
      </Component>
    )
  })
}
