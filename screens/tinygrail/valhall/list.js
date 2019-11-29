/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-29 22:02:57
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import _ from '@styles'
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

  return (
    <ListView
      style={_.container.flex}
      keyExtractor={item => String(item.id)}
      data={_list}
      renderItem={({ item, index }) => (
        <Item index={index} type='valhall' {...item} />
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
