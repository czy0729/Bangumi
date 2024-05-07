/*
 * @Author: czy0729
 * @Date: 2022-02-25 12:31:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 01:32:50
 */
import React from 'react'
import { PaginationList } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import data from '@assets/json/group.json'
import { Ctx } from '../../types'
import Filter from '../filter'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

const ListAll = (props, { $ }: Ctx) => {
  const { filter } = $.state
  return (
    <>
      <Filter />
      <PaginationList
        style={_.mt._md}
        contentContainerStyle={_.container.outer}
        data={
          filter ? data.filter(item => item.t.toLowerCase().includes(filter.toLowerCase())) : data
        }
        numColumns={2}
        renderItem={renderItem}
      />
    </>
  )
}

export default obc(ListAll, COMPONENT)
