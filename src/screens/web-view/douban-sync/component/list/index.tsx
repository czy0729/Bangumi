/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:02:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 22:35:01
 */
import { observer } from 'mobx-react'
import { Notice, PaginationList } from '@_'
import { _, useStore } from '@stores'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  return (
    <>
      <ToolBar />
      <PaginationList
        contentContainerStyle={_.container.bottom}
        data={$.data}
        limit={12}
        keyboardDismissMode='on-drag'
        ListHeaderComponent={
          $.data.length ? (
            <Notice>
              共查找到 {$.data.length} 项结果，其中 {$.matchCount} 项匹配成功
            </Notice>
          ) : null
        }
        renderItem={renderItem}
        onPage={$.onPage}
      />
    </>
  )
}

export default observer(List)
