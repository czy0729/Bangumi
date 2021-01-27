/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:18:40
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { obc } from '@utils/decorators'
import Item from '../_/item'
import { tabs } from './store'

const event = {
  id: '新番榜单.跳转'
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
      keyExtractor={keyExtractor}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={list}
      scrollToTop={tabs[page].key === id}
      renderItem={renderItem}
      onHeaderRefresh={() => $.fetchList(id)}
    />
  )
}

export default obc(List, {
  title: '全部'
})

function renderItem({ item, index }) {
  return <Item index={index} event={event} {...item} />
}
