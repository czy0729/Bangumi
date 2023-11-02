/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:13:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-02 17:00:20
 */
import React from 'react'
import { timelineStore } from '@stores'
import { getTimestamp } from '@utils'
import { matchUserId } from '@utils/match'
import { ob } from '@utils/decorators'
import { HOST } from '@constants'
import Item from './item'
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
    // global.rerender('Component.ItemTimeline')

    const userId = matchUserId(String(avatar?.url || p1?.url).replace(HOST, ''))
    if (userId in timelineStore.hidden) {
      if (getTimestamp() < timelineStore.hidden[userId]) return null
    }

    return (
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
    )
  }
)
