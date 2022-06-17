/*
 * @Author: czy0729
 * @Date: 2021-08-18 07:29:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-17 12:48:23
 */
import React from 'react'
import { ob } from '@utils/decorators'
import Item from './item'
import { memoStyles } from './styles'
import { Props as ItemCommentProps } from './types'

export { ItemCommentProps }

export const ItemComment = ob(
  ({
    navigation,
    style,
    time,
    avatar,
    userId,
    userName,
    star,
    comment,
    event
  }: ItemCommentProps) => (
    <Item
      navigation={navigation}
      styles={memoStyles()}
      style={style}
      time={time}
      avatar={avatar}
      userId={userId}
      userName={userName}
      star={star}
      comment={comment}
      event={event}
    />
  )
)
