/*
 * @Author: czy0729
 * @Date: 2022-02-25 12:30:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 06:51:02
 */
import React from 'react'
import { Flex, ScrollView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'

const List = (_props, { $ }: Ctx) => {
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

export default obc(List, COMPONENT)
