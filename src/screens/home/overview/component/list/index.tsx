/*
 * @Author: czy0729
 * @Date: 2024-09-19 20:35:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 22:41:40
 */
import React from 'react'
import { ScrollView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'

function List(_props, { $ }: Ctx) {
  return (
    <ScrollView contentContainerStyle={_.container.bottom} onScroll={$.onScroll}>
      {$.list.map((item, index) => (
        <Item key={item.id} item={item} index={index} />
      ))}
    </ScrollView>
  )
}

export default obc(List, COMPONENT)
