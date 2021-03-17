/*
 * @Author: czy0729
 * @Date: 2021-03-16 20:55:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-17 15:08:12
 */
import React from 'react'
import { ScrollView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from './item'

function List(props, { $ }) {
  return (
    <ScrollView contentContainerStyle={_.container.bottom}>
      {$.list.map((item, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <Item key={index} {...item} />
      ))}
    </ScrollView>
  )
}

export default obc(List)
