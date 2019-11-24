/*
 * @Author: czy0729
 * @Date: 2019-10-01 15:44:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-24 10:35:19
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import _ from '@styles'
import Item from './item'
import ItemRecents from './item-recents'
import { tabs } from './store'

function List({ index }, { $ }) {
  const { key } = tabs[index]
  const list = $.list(key)
  if (!list._loaded) {
    return <Loading style={_.container.screen} />
  }

  const isRecents = key === 'recents'
  const numColumns = isRecents ? undefined : 5
  return (
    <ListView
      key={String(numColumns)}
      style={_.container.screen}
      keyExtractor={item => String(item.id)}
      data={list}
      numColumns={numColumns}
      renderItem={({ item, index }) => {
        if (isRecents) {
          return <ItemRecents index={index} {...item} />
        }
        return <Item {...item} />
      }}
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
