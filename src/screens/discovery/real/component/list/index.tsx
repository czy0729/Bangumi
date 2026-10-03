/*
 * @Author: czy0729
 * @Date: 2026-10-03 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-04 04:35:20
 *
 * 找三次元列表
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { getColumnNum } from '../ds'
import Filter from '../filter'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  /** Filter 元素保持稳定引用, 避免列表更新时 ListHeaderComponent 重渲染 */
  const elFilter = useMemo(() => <Filter />, [])

  if (!$.state._loaded && !$.state.data._loaded) {
    return (
      <>
        {elFilter}
        <Loading />
      </>
    )
  }

  const numColumns = $.isList ? undefined : getColumnNum()

  return (
    <PaginationList
      key={`${$.state.layout}${numColumns}`}
      keyExtractor={keyExtractor}
      forwardRef={$.forwardRef}
      contentContainerStyle={_.container.bottom}
      numColumns={numColumns}
      data={$.list}
      limit={9}
      skipEnteringExitingAnimations={9}
      ListHeaderComponent={elFilter}
      renderItem={renderItem}
      onPage={$.onPage}
    />
  )
}

export default observer(List)
