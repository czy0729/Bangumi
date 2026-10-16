/*
 * @Author: czy0729
 * @Date: 2024-04-02 17:26:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 01:30:07
 *
 * 关联系列列表
 */
import { useMemo } from 'react'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import ToolBar from '../tool-bar'
import { keyExtractor, renderItem } from './utils'
import { COMPONENT, ENTERING_ANIMATIONS_NUM } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elToolBar = useMemo(() => <ToolBar />, [])

  const { fixed, fetching } = $.state

  // 无数据且请求中, 用 Loading 占位而不是列表的空态
  if (!$.data.length && fetching) {
    return (
      <>
        {!fixed && elToolBar}
        <Loading />
      </>
    )
  }

  return (
    <>
      {fixed && elToolBar}
      <PaginationList
        resetKey={$.state.sort}
        keyExtractor={keyExtractor}
        forwardRef={$.forwardRef}
        contentContainerStyle={_.container.bottom}
        data={$.data}
        limit={12}
        skipEnteringExitingAnimations={ENTERING_ANIMATIONS_NUM}
        ListHeaderComponent={!fixed && elToolBar}
        renderItem={renderItem}
        onScroll={$.onScroll}
        onPage={$.onPage}
      />
    </>
  )
}

export default observer(List)
