/*
 * @Author: czy0729
 * @Date: 2022-02-25 12:31:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-19 04:52:55
 */
import React from 'react'
import { PaginationList } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { getJSON } from '@assets/json'
import { Ctx } from '../../types'
import Filter from '../filter'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

const ListAll = (_props, { $ }: Ctx) => {
  const data = getJSON('group', [])
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
