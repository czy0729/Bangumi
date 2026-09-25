/*
 * @Author: czy0729
 * @Date: 2023-01-07 17:27:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 15:10:22
 */
import { observer } from 'mobx-react'
import { PaginationList } from '@_'
import { useStore } from '@stores'
import { LIST, LIST_LIMIT } from '../../ds'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

/** 支持者列表 */
function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()

  return (
    <PaginationList
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.container}
      data={LIST}
      numColumns={2}
      limit={LIST_LIMIT}
      renderItem={renderItem}
      onScroll={$.onScroll}
    />
  )
}

export default observer(List)
