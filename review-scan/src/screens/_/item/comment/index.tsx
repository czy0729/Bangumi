/*
 * @Author: czy0729
 * @Date: 2021-08-18 07:29:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 03:08:33
 */
import React from 'react'
import { Component } from '@components'
import { ob } from '@utils/decorators'
import { CollectionStatusCn } from '@types'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemCommentProps } from './types'

export { ItemCommentProps }

function ItemCommentWrap({
  navigation,
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
}: ItemCommentProps) {
  return (
    <Component id='item-comment' data-key={userId}>
      <Item
        navigation={navigation}
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
  )
}

export const ItemComment = ob(ItemCommentWrap, COMPONENT)

export default ItemComment
