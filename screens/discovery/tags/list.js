/*
 * @Author: czy0729
 * @Date: 2019-10-03 15:43:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-03 16:30:49
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import _ from '@styles'
import Item from './item'
import { tabs } from './store'

function List({ index }, { $ }) {
  const { key } = tabs[index]
  const list = $.list(key)
  if (!list._loaded) {
    return <Loading style={_.container.screen} />
  }

  return (
    <ListView
      style={_.container.screen}
      keyExtractor={item => `${item.title}|${item.nums}`}
      data={list}
      numColumns={4}
      renderItem={({ item }) => <Item type={key} {...item} />}
      onHeaderRefresh={() => $.fetchList(key, true)}
      onFooterRefresh={() => $.fetchList(key)}
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
