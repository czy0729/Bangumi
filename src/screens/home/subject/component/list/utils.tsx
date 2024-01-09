/*
 * @Author: czy0729
 * @Date: 2024-01-09 16:19:59
 * @Last Modified by:   czy0729
 * @Last Modified time: 2024-01-09 16:19:59
 */
import React from 'react'
import Item from '../item'

export function renderItem({ item, index }) {
  return (
    <Item
      index={index}
      time={item.time}
      avatar={item.avatar}
      userId={item.userId}
      userName={item.userName}
      star={item.star}
      comment={item.comment}
      relatedId={item.relatedId}
    />
  )
}
