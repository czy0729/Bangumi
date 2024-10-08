/*
 * @Author: czy0729
 * @Date: 2023-02-25 18:54:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-09 01:33:02
 */
import React from 'react'
import { ItemPM as ItemPMComp } from '@_'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import { COMPONENT, EVENT } from './ds'
import { Props } from './types'

function ItemPM({ id, item, index }: Props, { $, navigation }: Ctx) {
  return (
    <ItemPMComp
      {...item}
      navigation={navigation}
      event={EVENT}
      index={index}
      onRefresh={() => $.fetchPM(true, id)}
    />
  )
}

export default obc(ItemPM, COMPONENT)
