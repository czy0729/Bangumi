/*
 * @Author: czy0729
 * @Date: 2022-02-25 12:31:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 16:38:44
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { getJSON } from '@assets/json'
import Filter from '../filter'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

const ListAll = () => {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const data = getJSON('group', [])
    const { filter } = $.state

    return (
      <>
        <Filter $={$} />
        <PaginationList2
          style={_.mt._sm}
          contentContainerStyle={[_.container.wind, _.container.bottom]}
          data={
            filter ? data.filter(item => item.t.toLowerCase().includes(filter.toLowerCase())) : data
          }
          numColumns={2}
          renderItem={renderItem}
        />
      </>
    )
  })
}

export default ListAll
