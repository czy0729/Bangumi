/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-29 06:42:00
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import TinygrailItem from '@tinygrail/_/item'
import TinygrailItemRefine from '@tinygrail/_/item-refine'
import { TINYGRAIL_LIST_PROPS } from '@tinygrail/styles'
import { COMPONENT, EVENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function List({ id }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { sort } = $.state

  const renderItem = useCallback(
    ({ item, index }) => {
      const Component = id === 'refine/temple' ? TinygrailItemRefine : TinygrailItem
      return <Component index={index} event={EVENT} {...item} sort={sort} showMenu showStatus />
    },
    [id, sort]
  )

  const list = $.computedList(id)
  if (!list._loaded) return <Loading style={_.container.flex} color={_.colorTinygrailText} />

  return (
    <PaginationList2
      {...TINYGRAIL_LIST_PROPS}
      data={list.list}
      limit={25}
      renderItem={renderItem}
      onHeaderRefresh={$.fetchList}
    />
  )
}

export default observer(List)
