/*
 * @Author: czy0729
 * @Date: 2023-02-25 18:54:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-25 22:59:40
 */
import React from 'react'
import { ItemPM } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const EVENT = {
  id: '电波提醒.跳转'
} as const

function Item({ id, item }, { $, navigation }: Ctx) {
  return (
    <ItemPM
      navigation={navigation}
      event={EVENT}
      {...item}
      onRefresh={() => $.fetchPM(true, id)}
    />
  )
}

export default obc(Item)
