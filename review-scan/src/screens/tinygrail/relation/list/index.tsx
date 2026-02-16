/*
 * @Author: czy0729
 * @Date: 2020-10-29 20:49:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 12:10:49
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import Item from '../../_/item'
import { levelList, sortList } from '../../_/utils'

const EVENT = {
  id: '关联角色.跳转'
} as const

function List() {
  const { $ } = useStore<Ctx>()
  if (!$.list._loaded) {
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

export default ob(List)

function renderItem({ item, index }) {
  return <Item index={index} event={EVENT} {...item} />
}
