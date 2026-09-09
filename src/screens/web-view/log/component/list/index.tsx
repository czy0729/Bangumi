/*
 * @Author: czy0729
 * @Date: 2025-02-18 06:26:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-14 09:28:38
 */
import { observer } from 'mobx-react'
import { Loading } from '@components'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { ITEM_HEIGHT } from '../item/ds'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { data } = $.state
  if (!data.list.length) return <Loading />

  return (
    <PaginationList
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      skipEnteringExitingAnimations={10}
      estimatedItemHeight={ITEM_HEIGHT}
      data={data.list}
      limit={20}
      renderItem={renderItem}
      onHeaderRefresh={$.getData}
    />
  )
}

export default observer(List)
