/*
 * @Author: czy0729
 * @Date: 2024-09-19 20:35:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 10:10:39
 */
import React from 'react'
import { ScrollView } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
  return (
    <ScrollView contentContainerStyle={_.container.page} onScroll={$.onScroll}>
      {$.list.map((item, index) => (
        <Item key={item.id} item={item} index={index} />
      ))}
    </ScrollView>
  )
}

export default ob(List, COMPONENT)
