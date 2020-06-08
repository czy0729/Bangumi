/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-21 11:14:55
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import Item from '../_/item'
import { sortList } from '../_/utils'
import { tabs } from './store'

const event = {
  id: '我的委托.跳转'
}
const go = {
  bid: '买入',
  asks: '卖出',
  auction: '资产重组'
}

function List({ index }, { $ }) {
  const { key } = tabs[index]
  const list = $.list(key)
  if (!list._loaded) {
    return <Loading style={_.container.flex} />
  }

  const { sort, direction } = $.state
  let _list = list
  if (sort) {
    _list = {
      ..._list,
      list: sortList(sort, direction, list.list)
    }
  }

  return (
    <ListView
      style={_.container.flex}
      keyExtractor={(item, index) => String(index)}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={_list}
      renderItem={({ item, index }) => (
        <Item
          index={index}
          type={key}
          event={event}
          go={go[key]}
          onAuctionCancel={$.doAuctionCancel}
          {...item}
        />
      )}
      onHeaderRefresh={() => $.fetchList(key)}
    />
  )
}

List.defaultProps = {
  title: '全部'
}

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)
