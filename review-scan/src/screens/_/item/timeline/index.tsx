/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:13:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 03:14:17
 */
import React from 'react'
import { Component } from '@components'
import { timelineStore } from '@stores'
import { getTimestamp, matchUserId } from '@utils'
import { ob } from '@utils/decorators'
import { HOST } from '@constants'
import Item from './item'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ItemTimelineProps } from './types'

export { ItemTimelineProps }

export const ItemTimeline = ob(
  ({
    navigation,
    style,
    full,
    avatar,
    p1,
    p2,
    p3,
    p4,
    image,
    comment,
    reply,
    like,
    time,
    star,
    subject,
    subjectId,
    clearHref,
    index,
    event,
    onDelete,
    onHidden
  }: ItemTimelineProps) => {
    const userId = matchUserId(String(avatar?.url || p1?.url).replace(HOST, ''))
    if (userId in timelineStore.hidden) {
      if (getTimestamp() < timelineStore.hidden[userId]) return null
    }

    return (
      <Component id='item-timeline' data-key={`${p1?.url}|${time}`}>
        <Item
          navigation={navigation}
          styles={memoStyles()}
          style={style}
          full={full}
          avatar={avatar}
          userId={userId}
          p1={p1}
          p2={p2}
          p3={p3}
          p4={p4}
          image={image}
          comment={comment}
          reply={reply}
          like={like}
          time={time}
          star={star}
          subject={subject}
          subjectId={subjectId}
          clearHref={clearHref}
          index={index}
          event={event}
          onDelete={onDelete}
          onHidden={onHidden}
        />
      </Component>
    )
  },
  COMPONENT
)

export default ItemTimeline
