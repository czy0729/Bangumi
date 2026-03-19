/*
 * @Author: czy0729
 * @Date: 2021-08-18 07:29:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:24:50
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { CollectionStatusCn } from '@types'
import type { Props as ItemCommentProps } from './types'
export type { ItemCommentProps }

export const ItemComment = observer(
  ({
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

    return (
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
          subjectCommentSplit={systemStore.setting.subjectCommentSplit}
          onSelect={onSelect}
        />
      </Component>
    )
  }
)

export default ItemComment
