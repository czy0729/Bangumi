/*
 * @Author: czy0729
 * @Date: 2024-04-02 17:26:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 07:59:35
 */
import React from 'react'
import { PaginationList } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List() {
  const { $ } = useStore<Ctx>()
  return (
    <PaginationList
      key={$.state.sort}
      contentContainerStyle={_.container.bottom}
      data={$.data}
      limit={20}
      ListHeaderComponent={!$.state.fixed && <ToolBar />}
      renderItem={renderItem}
      onPage={$.onPage}
    />
  )
}

export default ob(List, COMPONENT)
