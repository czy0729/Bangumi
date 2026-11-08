/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:02:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 19:30:00
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
        keyboardDismissMode='on-drag'
        ListHeaderComponent={
          <Notice>
            共查找到 {$.data.length} 项结果，其中 {$.matchCount} 项匹配成功
          </Notice>
        }
        renderItem={renderItem}
        onPage={$.onPage}
      />
    </>
  )
}

export default observer(List)
