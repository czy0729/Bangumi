/*
 * @Author: czy0729
 * @Date: 2023-02-25 21:11:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-18 06:38:59
 */
import React from 'react'
import { ItemNotify as ItemNotifyComp } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'

function ItemNotify({ item, index }, { navigation }: Ctx) {
  return (
    <ItemNotifyComp
      {...item}
      navigation={navigation}
      event={EVENT}
      index={index - (item.repeat || 0)}
      repeat={item.repeat || 0}
    />
  )
}

export default obc(ItemNotify, COMPONENT)
