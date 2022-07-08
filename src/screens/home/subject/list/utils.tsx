/*
 * @Author: czy0729
 * @Date: 2020-04-06 05:41:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-08 07:48:15
 */
import React from 'react'
import { _ } from '@stores'
import Item from './item'

export const REFRESH_CONTROL_PROPS = {
  tintColor: _.__colorPlain__,
  titleColor: _.__colorPlain__
} as const

export function renderItem({ item }) {
  return (
    <Item
      time={item.time}
      avatar={item.avatar}
      userId={item.userId}
      userName={item.userName}
      star={item.star}
      comment={item.comment}
    />
  )
}
