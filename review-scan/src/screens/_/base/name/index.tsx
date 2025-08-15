/*
 * @Author: czy0729
 * @Date: 2020-11-26 10:16:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 14:56:10
 */
import React, { useCallback, useState } from 'react'
import { Component, Text } from '@components'
import { systemStore, usersStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { IOS } from '@constants'
import { VerticalAlign } from '../vertical-align'
import VerticalAlignWithRemoveSpec from './vertical-align-with-remove-spec'
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
    const text = userRemark || children

    const showLabel = showFriend && !!usersStore.myFriendsMap[userId]
    const showRight = showLabel || right
    const elRight = showRight ? (
      <>
        {showLabel && (
          <Text type='warning' size={11} lineHeight={textLineHeight}>
            {' '}
            好友
          </Text>
        )}
        {right}
      </>
    ) : null

    const passProps = {
      style,
      size,
      lineHeight: textLineHeight,
      bold,
      numberOfLines: lines,
      onPress: disabled ? undefined : setLines2,
      ...other
    }

    if (typeof text === 'string' && !IOS) {
      if (showRight) {
        return (
          <Component id='base-name'>
            <VerticalAlignWithRemoveSpec
              {...passProps}
              text={text}
              userId={userId}
              showFriend={showFriend}
              userRemark={userRemark}
              right={elRight}
            />
          </Component>
        )
      }

      return (
        <Component id='base-name'>
          <VerticalAlign
            {...passProps}
            style={stl(passProps.style, userRemark && memoStyles().highlight)}
            text={text}
          >
            {text}
          </VerticalAlign>
        </Component>
      )
    }

    return (
      <Component id='base-name'>
        <Text {...passProps}>
          {userRemark ? (
            <Text
              style={memoStyles().highlight}
              size={size}
              lineHeight={textLineHeight}
              bold={bold}
              numberOfLines={lines}
            >
              {text}
            </Text>
          ) : (
            text
          )}
          {elRight}
        </Text>
      </Component>
    )
  })
}

export default Name
