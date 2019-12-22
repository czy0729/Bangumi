/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-22 21:10:31
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import Item from '../_/item'
import { sortList } from '../_/utils'

function List(props, { $ }) {
  const { _loaded } = $.valhallList
  if (!_loaded) {
    return <Loading style={_.container.flex} />
  }

  const { sort, direction } = $.state
  let _list = $.valhallList
  if (sort) {
    _list = {
      ..._list,
      list: sortList(sort, direction, $.valhallList.list)
    }
  }

  const event = {
    id: '英灵殿.跳转'
  }
  return (
    <ListView
      style={_.container.flex}
      keyExtractor={item => String(item.id)}
      data={_list}
      renderItem={({ item, index }) => (
        <Item index={index} type='valhall' event={event} {...item} />
      )}
      onHeaderRefresh={$.fetchValhallList}
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
