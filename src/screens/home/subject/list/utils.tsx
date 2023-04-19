/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 15:53:58
 */
import React from 'react'
import { _ } from '@stores'
import Item from './item'

export const REFRESH_CONTROL_PROPS = {
  tintColor: _.__colorPlain__,
  titleColor: _.__colorPlain__
} as const

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
    />
  )
}
