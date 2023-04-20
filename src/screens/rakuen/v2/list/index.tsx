/*
 * @Author: czy0729
 * @Date: 2019-04-27 19:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 17:09:56
 */
import React from 'react'
import { Loading } from '@components'
import { Login, PaginationList2 } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import i18n from '@constants/i18n'
import Item from '../item'
import { Ctx } from '../types'
import { styles } from './styles'

function List({ index }, { $ }: Ctx) {
  // global.rerender('Rakuen.List')

  const type = $.type(index)
  if (type === 'hot' && !$.isWebLogin) {
    return (
      <Login text={`热门帖子需${i18n.login()}才能显示`} btnText={`去${i18n.login()}`} />
    )
  }

  const { list, _loaded } = $.rakuen(type)
  if (!_loaded) return <Loading />

  return (
    <PaginationList2
      key={type}
      keyExtractor={keyExtractor}
      connectRef={ref => $.connectRef(ref, index)}
      contentContainerStyle={styles.contentContainerStyle}
      data={list}
      limit={24}
      progressViewOffset={_.ios(styles.contentContainerStyle.paddingTop - _.sm, 0)}
      renderItem={renderItem}
      scrollEventThrottle={32}
      onScroll={$.onScroll}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchRakuen}
    />
  )
}

export default obc(List)

function keyExtractor(item: { href: any }) {
  return item.href
}

function renderItem({ item, index }) {
  return <Item index={index} {...item} />
}
