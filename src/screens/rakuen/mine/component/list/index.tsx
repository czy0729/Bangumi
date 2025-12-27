/*
 * @Author: czy0729
 * @Date: 2022-02-25 12:30:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:38:33
 */
import React from 'react'
import { Flex, ScrollView } from '@components'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Item from '../item'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

const List = () => {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
    <ScrollView contentContainerStyle={_.container.bottom}>
      <Flex wrap='wrap'>
        {$.mine.list.map(item => (
          <Item key={item.id} {...item} />
        ))}
      </Flex>
    </ScrollView>
  ))
}

export default List
