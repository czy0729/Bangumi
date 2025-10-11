/*
 * @Author: czy0729
 * @Date: 2021-08-18 07:29:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-11 18:08:55
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Component } from '@components'
import { r } from '@utils/dev'
import { CollectionStatusCn } from '@types'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemCommentProps } from './types'

export { ItemCommentProps }

export const ItemComment = ({
  style,
  time,
  avatar,
  userId,
  userName,
  star,
  status,
  comment,
  subjectId,
  relatedId,
  action,
  mainId,
  mainName,
  event,
  popoverData,
  like,
  onSelect
}: ItemCommentProps) => {
  r(COMPONENT)

  return useObserver(() => (
    <Component id='item-comment' data-key={userId}>
      <Item
        styles={memoStyles()}
        style={style}
        time={time}
        avatar={avatar}
        userId={userId}
        userName={userName}
        star={star}
        status={(status || action) as CollectionStatusCn}
        comment={comment}
        subjectId={subjectId}
        relatedId={relatedId}
        mainId={mainId}
        mainName={mainName}
        event={event}
        popoverData={popoverData}
        like={like}
        onSelect={onSelect}
      />
    </Component>
  ))
}

export default ItemComment
