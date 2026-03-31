/*
 * @Author: czy0729
 * @Date: 2022-02-25 12:30:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 06:11:25
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Flex, ScrollView } from '@components'
import { _, useStore } from '@stores'
import Item from '../item'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <ScrollView contentContainerStyle={_.container.bottom}>
      <Flex style={_.mt.sm} wrap='wrap'>
        {$.mine.list.map(item => (
          <Item key={item.id} {...item} />
        ))}
      </Flex>
    </ScrollView>
  )
}

export default observer(List)
