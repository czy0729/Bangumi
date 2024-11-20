/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:02:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 05:42:00
 */
import React from 'react'
import { Notice, PaginationList2 as PaginationList } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
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

export default ob(List, COMPONENT)
