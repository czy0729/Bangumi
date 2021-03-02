/*
 * @Author: czy0729
 * @Date: 2021-03-02 10:30:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-02 19:37:10
 */
import React from 'react'
import { Flex, Loading, ScrollView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from './item'

function List(props, { $ }) {
  const { hover, _loaded } = $.state
  const { list } = $.star
  if (!_loaded || !$.star._loaded) {
    return <Loading />
  }

  return (
    <ScrollView style={_.container.flex}>
      <Flex wrap='wrap'>
        {list.map(item => (
          <Item key={item.id} {...item} hover={item.id === hover} />
        ))}
      </Flex>
    </ScrollView>
  )
}

export default obc(List)
