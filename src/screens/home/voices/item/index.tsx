/*
 * @Author: czy0729
 * @Date: 2023-03-02 14:17:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 11:59:08
 */
import React from 'react'
import { ItemVoice } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const EVENT = {
  id: '角色.跳转'
} as const

function Item({ item, index }, { navigation }: Ctx) {
  // {!index && <Heatmap id='角色.跳转' />}
  return (
    <ItemVoice
      style={_.container.item}
      navigation={navigation}
      event={EVENT}
      index={index}
      {...item}
    />
  )
}

export default obc(Item)
