/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-19 17:01:01
 *
 * 制作人员分页列表
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ITEM_CHARACTER_HEIGHT, PaginationList } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <PaginationList
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.list}
      estimatedItemHeight={ITEM_CHARACTER_HEIGHT}
      limit={12}
      renderItem={renderItem}
      onScroll={$.onScroll}
    />
  )
}

export default observer(List)
