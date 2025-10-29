/*
 * @Author: czy0729
 * @Date: 2022-07-25 17:04:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-29 23:16:34
 */
import React from 'react'
import { Empty, Heatmap } from '@components'
import { FilterText } from '@_'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import Item from '../../item'
import { COMPONENT } from './ds'

import type { Ctx } from '../../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { list } = $.list
    const { _filter } = $.rank

    return (
      <>
        {list.length ? (
          list.map((item, index) => <Item key={item.id} item={item} index={index} />)
        ) : (
          <Empty />
        )}
        {!!_filter && <FilterText value={_filter} />}
        <Heatmap id='排行榜.跳转' />
      </>
    )
  })
}

export default List
