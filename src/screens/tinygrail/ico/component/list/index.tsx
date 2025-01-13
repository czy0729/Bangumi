/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-14 00:06:37
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { refreshControlProps } from '@tinygrail/styles'
import { Ctx, TabsKey } from '../../types'
import { renderItem } from './utils'
import { COMPONENT } from './ds'

function List({ id }: { id: TabsKey }) {
  const { $ } = useStore<Ctx>()
  const list = $.list(id)
  if (!list._loaded) return <Loading style={_.container.flex} color={_.colorTinygrailText} />

  return (
    <PaginationList2
      keyExtractor={keyExtractor}
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      refreshControlProps={refreshControlProps}
      footerTextType='tinygrailText'
      data={list.list}
      limit={24}
      renderItem={renderItem}
      onHeaderRefresh={() => $.fetchList(id)}
    />
  )
}

export default ob(List, COMPONENT)
