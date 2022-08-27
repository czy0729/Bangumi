/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-27 21:26:00
 */
import React from 'react'
import { ScrollView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from '../item'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  return (
    <ScrollView contentContainerStyle={[_.mt.md, _.container.bottom]}>
      {$.list.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </ScrollView>
  )
}

export default obc(List)
