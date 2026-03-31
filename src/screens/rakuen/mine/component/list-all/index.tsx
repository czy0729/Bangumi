/*
 * @Author: czy0729
 * @Date: 2022-02-25 12:31:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-01 06:10:52
 */
import React, { useMemo } from 'react'
import { observer } from 'mobx-react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { getJSON } from '@assets/json'
import Filter from '../filter'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function ListAll() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const data = getJSON('group', [])
  const { filter } = $.state

  const memoFilterData = useMemo(
    () => data.filter(item => item.t.toLowerCase().includes(filter.toLowerCase())),
    [data, filter]
  )

  return (
    <>
      <Filter />
      <PaginationList2
        contentContainerStyle={_.container.list}
        data={filter ? memoFilterData : data}
        numColumns={2}
        renderItem={renderItem}
      />
    </>
  )
}

export default observer(ListAll)
