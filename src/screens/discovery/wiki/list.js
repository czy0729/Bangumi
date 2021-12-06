/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-06 07:37:44
 */
import React from 'react'
import { ScrollView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from './item'

function List(props, { $ }) {
  return (
    <ScrollView contentContainerStyle={[_.mt.md, _.container.bottom]}>
      {$.list.map((item, index) => (
        <Item key={index} {...item} />
      ))}
    </ScrollView>
  )
}

export default obc(List)
