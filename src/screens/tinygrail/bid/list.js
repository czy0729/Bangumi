/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:09:53
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import Item from '../_/item'
import { tabs } from './store'

const event = {
  id: '我的委托.跳转'
}
const go = {
  bid: '买入',
  asks: '卖出',
  auction: '资产重组'
}

function List({ id }, { $ }) {
  const list = $.computedList(id)
  if (!list._loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const { page } = $.state
  return (
    <ListView
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={(item, index) => String(index)}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={list}
      scrollToTop={tabs[page].key === id}
      renderItem={({ item, index }) => (
        <Item
          index={index}
          type={id}
          event={event}
          go={go[id]}
          onAuctionCancel={$.doAuctionCancel}
          {...item}
        />
      )}
      onHeaderRefresh={() => $.fetchList(id)}
    />
  )
}

export default obc(List, {
  title: '全部'
})
