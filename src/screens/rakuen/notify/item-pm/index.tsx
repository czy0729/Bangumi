/*
 * @Author: czy0729
 * @Date: 2023-02-25 18:54:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 15:42:28
 */
import React from 'react'
import { ItemPM } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const EVENT = {
  id: '电波提醒.跳转'
} as const

function Item({ id, item, index }, { $, navigation }: Ctx) {
  return (
    <ItemPM
      navigation={navigation}
      event={EVENT}
      index={index}
      {...item}
      onRefresh={() => $.fetchPM(true, id)}
    />
  )
}

export default obc(Item)
