/*
 * @Author: czy0729
 * @Date: 2021-03-02 10:30:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-09 05:44:22
 */
import React from 'react'
import { Flex, Loading, ScrollView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import Item from '../item'
import { COMPONENT } from './ds'

function List(props, { $ }: Ctx) {
  if (!$.state._loaded || !$.star._loaded) return <Loading />

  const isSelf = $.state.label === '持仓'
  let mergeListMap = {}
  if (isSelf) mergeListMap = $.mergeListMap()

  return (
    <ScrollView style={_.container.flex}>
      <Flex wrap='wrap'>
        {$.star.list.map(item => (
          <Item
            key={item.id}
            {...item}
            size={$.state.limit === 24 ? 'lg' : 'sm'}
            hover={item.id === $.state.hover}
            isDisabled={isSelf && !mergeListMap[item.id]}
          />
        ))}
      </Flex>
    </ScrollView>
  )
}

export default obc(List, COMPONENT)
