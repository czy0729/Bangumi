/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-29 20:31:22
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import Item from '../_/item'
import { levelList, sortList } from '../_/utils'

const event = {
  id: '我的委托.跳转'
}
const go = {
  bid: '买入',
  asks: '卖出',
  auction: '资产重组'
}

function List({ id }, { $ }) {
  const list = $.list(id)
  if (!list._loaded) {
    return (
      <Loading
        style={_.container.flex}
        color={_.colorTinygrailText}
      />
    )
  }

  const { level, sort, direction } = $.state
  let _list = list
  if (level) {
    _list = {
      ..._list,
      list: levelList(level, _list.list)
    }
  }

  if (sort) {
    _list = {
      ..._list,
      list: sortList(sort, direction, _list.list)
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

List.defaultProps = {
  title: '全部'
}

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)
