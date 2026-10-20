/*
 * @Author: czy0729
 * @Date: 2020-05-21 17:07:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-27 09:13:08
 *
 * 制作人员分页列表
 */
import { observer } from 'mobx-react'
import { ITEM_PERSON_HEIGHT, PaginationList } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <PaginationList
      // 切换职位后整批重建, 回到顶部并从第 1 页开始
      key={$.state.position}
      keyExtractor={keyExtractor}
      contentContainerStyle={_.container.bottom}
      data={$.list}
      limit={12}
      estimatedItemHeight={ITEM_PERSON_HEIGHT}
      renderItem={renderItem}
      onScroll={$.onScroll}
    />
  )
}

export default observer(List)
