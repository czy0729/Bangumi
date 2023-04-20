/*
 * @Author: czy0729
 * @Date: 2023-02-25 21:11:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 15:41:40
 */
import React from 'react'
import { ItemNotify } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const EVENT = {
  id: '电波提醒.跳转'
} as const
let repeat: number = 0

function Item({ item, index }, { $, navigation }: Ctx) {
  const next = $.notify.list[index + 1]
  if (
    next &&
    next.userId === item.userId &&
    next.title === item.title &&
    next.message === item.message &&
    next.message2 === item.message2
  ) {
    repeat += 1
    return null
  }

  const passRepeat = repeat
  repeat = 0

  return (
    <ItemNotify
      navigation={navigation}
      index={index - repeat}
      event={EVENT}
      {...item}
      repeat={passRepeat}
    />
  )
}

export default obc(Item)
