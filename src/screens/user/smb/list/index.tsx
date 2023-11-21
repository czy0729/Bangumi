/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:20:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-18 15:31:57
 */
import React from 'react'
import { ScrollView } from '@components'
import { obc } from '@utils/decorators'
import Top from '../top'
import Item from '../item'
import Pagination from '../pagination'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  const { uuid, sort, tags, page } = $.state
  return (
    <>
      <ScrollView key={`${uuid}|${sort}|${JSON.stringify(tags)}|${page}`}>
        <Top />
        {$.pageList.map((item, index) => (
          <Item key={String(item?.folder || index)} {...item} />
        ))}
      </ScrollView>
      <Pagination />
    </>
  )
}

export default obc(List)
