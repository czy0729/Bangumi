/*
 * @Author: czy0729
 * @Date: 2024-01-06 23:31:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:20:32
 */
import React from 'react'
import { ItemTimeline } from '@_'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { EVENT } from '../ds'
import { COMPONENT } from './ds'

function Item({ item, index }) {
  const { $, navigation } = useStore<Ctx>()
  return (
    <ItemTimeline
      navigation={navigation}
      index={index}
      event={EVENT}
      {...item}
      full
      onDelete={$.doDelete}
    />
  )
}

export default ob(Item, COMPONENT)
