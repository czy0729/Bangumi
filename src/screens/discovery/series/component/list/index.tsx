/*
 * @Author: czy0729
 * @Date: 2024-04-02 17:26:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-03 10:24:44
 */
import React from 'react'
import { PaginationList } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import ToolBar from '../tool-bar'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List(props, { $ }: Ctx) {
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

export default obc(List, COMPONENT)
