/*
 * @Author: czy0729
 * @Date: 2022-04-24 14:16:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 02:35:00
 *
 * 同步列表
 */
import { observer } from 'mobx-react'
import { Notice, PaginationList } from '@_'
import { _, useStore } from '@stores'
import ToolBar from '../tool-bar'
import ListEmpty from './empty'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function List() {
  const { $ } = useStore<Ctx>(COMPONENT)

  if (!$.data.length) return <ListEmpty />

  return (
    <>
      <ToolBar />
      <PaginationList
        contentContainerStyle={_.container.bottom}
        data={$.data}
        limit={12}
        ListHeaderComponent={
          <Notice>
            共查找到 {$.data.length} 项 bilibili 追番结果，若 bgm 收藏状态与实际不符，请检查授权状态
          </Notice>
        }
        renderItem={renderItem}
        onHeaderRefresh={$.onHeaderRefresh}
        onPage={$.onPage}
      />
    </>
  )
}

export default observer(List)
