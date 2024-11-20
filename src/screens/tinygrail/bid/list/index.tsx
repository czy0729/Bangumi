/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-02 12:18:50
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import Item from '@tinygrail/_/item'
import { refreshControlProps } from '@tinygrail/styles'
import { tabs } from '../ds'
import { Ctx, TabsKeys } from '../types'

const EVENT = {
  id: '我的委托.跳转'
} as const

const GO = {
  bid: '买入',
  asks: '卖出',
  auction: '资产重组'
} as const

function List({ id }: { id: TabsKeys }) {
  const { $ } = useStore<Ctx>()
  const list = $.computedList(id)
  if (!list._loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const { page } = $.state
  return (
    <PaginationList2
      keyExtractor={(_item, index) => String(index)}
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      refreshControlProps={refreshControlProps}
      footerTextType='tinygrailText'
      data={list.list}
      scrollToTop={tabs[page].key === id}
      renderItem={({ item, index }: any) => (
        <Item
          index={index}
          type={id}
          event={EVENT}
          go={GO[id]}
          onAuctionCancel={$.doAuctionCancel}
          {...item}
        />
      )}
      onHeaderRefresh={() => $.fetchList(id)}
    />
  )
}

export default ob(List)
