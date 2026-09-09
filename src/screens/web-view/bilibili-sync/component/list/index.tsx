/*
 * @Author: czy0729
 * @Date: 2022-04-24 14:16:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-26 22:31:40
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
        ListHeaderComponent={
          $.data.length ? (
            <Notice>
              共查找到 {$.data.length} 项 bilibili 追番结果，若 bgm
              收藏状态与实际不符，请检查授权状态
            </Notice>
          ) : null
        }
        renderItem={renderItem}
        onHeaderRefresh={$.onHeaderRefresh}
        onPage={$.onPage}
      />
    </>
  )
}

export default observer(List)
