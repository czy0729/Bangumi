/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:55:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 21:37:48
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import ItemAdvance from '@tinygrail/_/item-advance'
import { TINYGRAIL_LIST_PROPS } from '@tinygrail/styles'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleRenderItem = useCallback(
    ({ item, index }) => (
      <ItemAdvance
        index={index}
        event={{
          id: '卖一推荐.跳转',
          data: {
            userId: $.myUserId
          }
        }}
        {...item}
      />
    ),
    [$]
  )

  const { list, _loaded } = $.computedList
  if (!_loaded) return <Loading style={_.container.flex} color={_.colorTinygrailText} />

  return (
    <PaginationList2
      {...TINYGRAIL_LIST_PROPS}
      data={list}
      limit={25}
      renderItem={handleRenderItem}
      onHeaderRefresh={$.fetchAdvanceList}
    />
  )
}

export default observer(List)
