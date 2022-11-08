/*
 * @Author: czy0729
 * @Date: 2020-10-29 20:49:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-09 06:16:36
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import Item from '../../_/item'
import { levelList, sortList } from '../../_/utils'
import { Ctx } from '../types'

const EVENT = {
  id: '关联角色.跳转'
} as const

function List(props, { $ }: Ctx) {
  const { _loaded } = $.list
  if (!_loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const { level, sort, direction } = $.state
  let _list = $.list
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
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={_list}
      windowSize={6}
      initialNumToRender={24}
      maxToRenderPerBatch={24}
      updateCellsBatchingPeriod={24}
      lazy={24}
      scrollToTop
      renderItem={renderItem}
    />
  )
}

export default obc(List)

function renderItem({ item, index }) {
  return <Item index={index} event={EVENT} {...item} />
}
