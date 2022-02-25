/*
 * @Author: czy0729
 * @Date: 2022-02-25 12:30:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-25 12:31:16
 */
import React from 'react'
import { ScrollView, Flex } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from './item'

const List = (props, { $ }) => {
  return (
    <ScrollView contentContainerStyle={_.container.outer} scrollToTop>
      <Flex style={_.mt._sm} wrap='wrap'>
        {$.mine.list.map(item => (
          <Item key={item.id} {...item} />
        ))}
      </Flex>
    </ScrollView>
  )
}

export default obc(List)
