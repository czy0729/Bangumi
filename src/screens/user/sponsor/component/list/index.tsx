/*
 * @Author: czy0729
 * @Date: 2023-01-07 17:27:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-01 10:27:31
 */
import React, { useMemo } from 'react'
import { Notice, PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TEXT_UPDATE_SPONSOR } from '@constants'
import { LIST } from '../../ds'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elListHeaderComponent = useMemo(
    () => (
      <Notice>
        截止至 {TEXT_UPDATE_SPONSOR} 共 {LIST.length} 人投食了，感谢你们的支持！
      </Notice>
    ),
    []
  )

  return useObserver(() => (
    <PaginationList2
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={LIST}
      numColumns={2}
      limit={40}
      ListHeaderComponent={elListHeaderComponent}
      renderItem={renderItem}
      onScroll={$.onScroll}
    />
  ))
}

export default List
