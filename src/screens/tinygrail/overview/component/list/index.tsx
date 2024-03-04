/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-03 22:09:20
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { refreshControlProps } from '@tinygrail/styles'
import { TABS } from '../../ds'
import { Ctx, TabsKey } from '../../types'
import { renderItem, renderItemRefine } from './utils'
import { COMPONENT } from './ds'

function List(
  {
    id
  }: {
    id: TabsKey
  },
  { $ }: Ctx
) {
  const list = $.computedList(id)
  if (!list._loaded) return <Loading style={_.container.flex} color={_.colorTinygrailText} />

  return (
    <PaginationList2
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      refreshControlProps={refreshControlProps}
      footerTextType='tinygrailText'
      data={list.list}
      limit={25}
      scrollToTop={TABS[$.state.page].key === id}
      renderItem={id === 'refine/temple' ? renderItemRefine : renderItem}
      onHeaderRefresh={$.fetchList}
    />
  )
}

export default obc(List, COMPONENT)
